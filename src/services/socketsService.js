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

  onProfileComment(callback) {
    this.socket.on('profile-comment', msg => {
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

  sendPost(post, id) {
    this.socket.emit('post', {
      content: post,
      author: parseInt(id, 10),
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
  
  onInvitationNotification(callback) {
    this.socket.on('invitation-notification', () => {
      callback();
    });
  }
  
  sendClientInfo(id) {
    this.socket.emit('clientInfo', { userId: id });
  }
  

  
  sendComment(comment, userId, postId, friendProfile = null) {
    this.socket.emit('comment', {
      content: comment,
      userId,
      postId,
      friendProfile,
    });
  }
  
  sendMessage(message, senderId, receiverId) {
    this.socket.emit('message', {
      message, senderId, receiverId,
    });
  }

  sendInvitation(who, whom) {
    this.socket.emit('invitation', {
      who, whom,
    });
  }
}

const socketService = new SocketsService();

export default socketService;