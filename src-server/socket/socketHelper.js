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

const sendComment = (comment) => {
  const formData = new FormData();
  formData.append('content', comment.content);
  formData.append('userId', comment.userId);
  formData.append('postId', comment.postId);

  return fetch('http://localhost:3000/dashboard/comment', {
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
};

const onCommenet = (io, socket) => {
  socket.on('comment', (comment) => {
    sendComment(comment)
      .then(response => {
        if(response.status === 201) {
          return response.json();
        }
        return null;
      })
      .then(data => {
        if(data) {
          return io.emit('comment', data);
        }
      });
  });
};

const socketHelper = (io) => {
  io.on('connection', (socket) => {
    onPost(io, socket);
    onCommenet(io, socket);
  });
};

module.exports = socketHelper;