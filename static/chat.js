const socket = io('http://localhost:3003', { transports: ['websocket'] });
console.log(socket);

const messageInput = document.getElementById('message');
const messages = document.getElementById('messages');

const nickname = prompt('닉네임 입력하시오');
let roomName = '채팅방 1';

socket.emit('logIn', nickname, roomName);

const submitNewMessage = () => {
  const message = messageInput.value.trim();
  if (message == '') return alert('메세지를 입력하세요');
  const data = { nickname, roomName, message };

  socket.emit('message', data);
  messageInput.value = null;
};

socket.on('message', (nickname, message) => {
  handleNewMessage(`[${nickname}] : ${message}`);
});

socket.on('join', (data) => {
  handleNewMessage(`[${data}] 님이 입장하셨습니다.`);
});

socket.on('usercount', (userCount) => {
  const userCounter = document.getElementById('usercount');
  userCounter.innerText = `현재 ${userCount} 명 서버 접속 중`;
});

socket.on('roomChanged', (roomNameToJoin) => {
  roomName = roomNameToJoin;
  handleNewMessage(`${roomNameToJoin}번 방에 입장하였습니다.`);
});

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
};

const buildNewMessage = (message) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  return li;
};

function joinRoom() {
  const roomOptions = document.getElementById('roomOptions');
  const roomNameToJoin = roomOptions.options[roomOptions.selectedIndex].value;
  const data = { roomName, roomNameToJoin };

  socket.emit('joinRoom', data);
}
