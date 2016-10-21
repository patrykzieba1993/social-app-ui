const fetch = require('node-fetch');
const FormData = require('form-data');

const sendPost = (post) => {
  const formData = new FormData();
  formData.append('userId', post.author);
  formData.append('content', post.content);
  
  return fetch('http://localhost:3000/dashboard/post', {
    method: 'POST',
    body: formData,
  });
}

const onPost = (io, socket) => {
  socket.on('post', (post) => {
    sendPost(post)
      .then(response => {
        if (response.status === 201) {
          return response.json();
        }
        return null;
        // ogarnac obsluge bledow ...
      })
      .then(data => {
        if(data) {
          return io.emit('post', Object.assign(post, { comments: [], id: data.id }));  
        }
      });
      // i tu tez catch ...
  });
}

const socketHelper = (io) => {
  io.on('connection', (socket) => {
    onPost(io, socket);
  });
};

module.exports = socketHelper;