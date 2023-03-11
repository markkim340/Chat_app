const BACK_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://markproject.site';
const socket = io(BACK_URL, { transports: ['websocket'] });

const messageInput = document.getElementById('message');
const messages = document.getElementById('messages');

let roomName = '대기실';

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

socket.on('joinMessage', (nickname, roomNameToJoin) => {
  roomName = roomNameToJoin;
  handleNewMessage(`[${nickname}] 님이 ${roomNameToJoin}에 입장하셨습니다.`);
});

socket.on('exitMessage', (data) => {
  handleNewMessage(`[${data}] 님이 나갔습니다.`);
});

socket.on('joinUserCount', (userCount) => {
  const userCounter = document.getElementById('usercount');
  userCounter.innerText = `현재 ${userCount} 명 서버 접속 중`;
});

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
};

const buildNewMessage = (message) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  return li;
};

function joinRoom(nickname) {
  nickname = nickname;
  const roomOptions = document.getElementById('roomOptions');
  const roomNameToJoin = roomOptions.options[roomOptions.selectedIndex].value;

  socket.emit('joinRoom', nickname, roomName, roomNameToJoin);
}

function leftRoom(nickname) {
  nickname = nickname;
  const roomNameToJoin = '대기실';

  socket.emit('joinRoom', nickname, roomName, roomNameToJoin);
}
