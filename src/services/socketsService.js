import io from 'socket.io-client';

class SocketsService {
  constructor(){
    this.socket = null;
    this.init();
  }
  
  init() {
    this.socket = io.connect('localhost:3001');
  }
  
  onPost(callback) {
    this.socket.on('post', msg => {
      callback(msg);
    });
  }
  
  onComment(callback) {
    this.socket.on('comment', msg => {
      callback(msg);
    });
  }

  onMessage(callback) {
    this.socket.on('message', msg => {
      callback(msg);
    });
  }
  
  onPostNotification(callback) {
    this.socket.on('post-notification', () => {
      callback();
    });
  }

  onCommentNotification(callback) {
    this.socket.on('comment-notification', () => {
      callback();
    });
  }

  onMessageNotification(callback) {
    this.socket.on('message-notification', () => {
      if (window.location.pathname.indexOf('chat') === -1) {
        callback()  
      }
    });
  }
  
  sendClientInfo(id) {
    this.socket.emit('clientInfo', { userId: id });
  }
  
  sendPost(post, id) {
    this.socket.emit('post', {
      content: post,
      author: parseInt(id, 10),
    });
  }
  
  sendComment(comment, userId, postId) {
    this.socket.emit('comment', {
      content: comment,
      userId,
      postId,
    });
  }
  
  sendMessage(message, senderId, receiverId) {
    this.socket.emit('message', {
      message, senderId, receiverId,
    });
  }
}

const socketService = new SocketsService();

export default socketService;