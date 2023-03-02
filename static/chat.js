const socket = io('http://localhost:3003', { transports: ['websocket'] });
console.log(socket);

const message = document.getElementById('message');
const messages = document.getElementById('messages');

const submitNewMessage = () => {
  console.log('TESTTEST');
  socket.emit('message', { data: message.value });
};

socket.on('message', ({ data }) => {
  handleNewMessage(data);
});

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
};

const buildNewMessage = (message) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  return li;
};
