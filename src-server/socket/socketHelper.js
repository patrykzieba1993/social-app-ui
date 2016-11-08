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

const sendMessage = (data) => {
  const formData = new FormData();
  formData.append('content', data.message);
  formData.append('senderId', data.senderId);
  formData.append('receiverId', data.receiverId);

  return fetch('http://localhost:3000/chat/message', {
    method: 'POST',
    body: formData,
  });
};

const sendInvitation = (data) => {
  const formData = new FormData();
  formData.append('userId', data.who);
  formData.append('friendId', data.whom);

  return fetch('http://localhost:3000/friendship', {
    method: 'POST',
    body: formData,
  });
}

// =======================================================

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
              io.sockets.in(subscriber.socketId).emit('post', Object.assign({}, Object.assign(post, { comments: [], id: data.id }), { userData: data.userData }));
            }
          });
          io.sockets.in(socket.id).emit('post', Object.assign({}, Object.assign(post, { comments: [], id: data.id }), { userData: data.userData }));
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
        const backSocket = comment.friendProfile ? 'profile-comment' : 'comment';
        if(data) {
          data.friends.forEach(friendId => {
            const subscriber = clients.find(client => client.userId == friendId);
            if (subscriber) {
              if (backSocket != 'profile-comment') {
                io.sockets.in(subscriber.socketId).emit(backSocket, data.comment);
              }
              io.sockets.in(subscriber.socketId).emit('comment-notification');
            }
          });
          io.sockets.in(socket.id).emit(backSocket, data.comment);
        }
      });
  });
};

const onMessage = (io, socket) => {
  const notify = (data) => {
    const notifyAboutMessage = (id) => io.sockets.in(id).emit('message', data);
    const subscriber = clients.find(client => client.userId == data.receiverId);
    if (subscriber) {
      notifyAboutMessage(subscriber.socketId);
      io.sockets.in(subscriber.socketId).emit('message-notification');
    }
    notifyAboutMessage(socket.id);
  };
  
  socket.on('message', (data) => {
    sendMessage(data)
      .then(response => {
        if(response.status === 201) {
          notify({
            content: data.message,
            senderId: data.senderId,
            receiverId: data.receiverId,
          });
        }
        return null;
      });
  });
};

const onInvitation = (io, socket) => {
  socket.on('invitation', data => {
    const notify = () => {
      const subscriber = clients.find(client => client.userId == data.whom)
      if (subscriber) {
        io.sockets.in(subscriber.socketId).emit('invitation-notification');
      }
    };

    sendInvitation(data)
      .then(response => {
        if (response.status === 201) {
          notify();
        }
      });
  });
};

const onDisconnect = (io, socket) => {
  socket.on('disconnect', () => {
    clients.forEach((client, index) => {
      if (client.socketId == socket.id) {
        clients.splice(index, 1);
      };
    });
  });
};

const socketHelper = (io) => {
  io.on('connection', (socket) => {
    onClientInfo(io, socket);
    onPost(io, socket);
    onCommenet(io, socket);
    onInvitation(io, socket);
    onDisconnect(io, socket);
    onMessage(io, socket);
  });
};

module.exports = socketHelper;