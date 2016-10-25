const fetch = require('node-fetch');
const FormData = require('form-data');

const clients = [];

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

const onClientInfo = (io, socket) => {
  socket.on('clientInfo', (data) => {
    let clientInfo = {
      userId: data.userId,
      socketId: socket.id,
    };

    clients.push(clientInfo);
  });
};

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
          data.friends.forEach(friendId => {
            const subscriber = clients.find(client => client.userId == friendId);
            if (subscriber) {
              io.sockets.in(subscriber.socketId).emit('post-notification');
              io.sockets.in(subscriber.socketId).emit('post', Object.assign(post, { comments: [], id: data.id }));
            }
          });
          io.sockets.in(socket.id).emit('post', Object.assign(post, { comments: [], id: data.id }));
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
          data.friends.forEach(friendId => {
            const subscriber = clients.find(client => client.userId == friendId);
            if (subscriber) {
              io.sockets.in(subscriber.socketId).emit('comment', data.comment);
              io.sockets.in(subscriber.socketId).emit('comment-notification');
            }
          });
          io.sockets.in(socket.id).emit('comment', data.comment);
        }
      });
  });
};

const onDisconnect = (io, socket) => {
  clients.forEach((client, index) => {
    if (client.socketId == socket.id) {
      clients.splice(index, 1);
    };
  });
};

const socketHelper = (io) => {
  io.on('connection', (socket) => {
    onClientInfo(io, socket);
    onPost(io, socket);
    onCommenet(io, socket);
    onDisconnect(io, socket);
  });
};

module.exports = socketHelper;