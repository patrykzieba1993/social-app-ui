const fetch = require('node-fetch');
const FormData = require('form-data');

const sendPost = (post) => {
  const formData = new FormData();
  formData.append('userId', post.id);
  formData.append('content', post.content);
  
  return fetch('http://localhost:3000/dashboad/post', {
    method: 'POST',
    body: formData,
  });
}

const onPost = (io, socket) => {
  socket.on('post', (msg) => {
    sendPost(post)
      .then(response => {
        if (response.status === 201) {
          return io.emit('post', msg);      
        }
        // ogarnac obsluge bledow ...
      })
      // i tu tez catch ...
  });
}

const socketHelper = (io) => {
  io.on('connection', (socket) => {
    onPost(io, socket);
  });
};

module.exports = socketHelper;