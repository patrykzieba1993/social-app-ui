import io from 'socket.io-client';

class SocketsService {
  constructor(){
    this.socket = null;
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
  
  onPostNotification(callback) {
    this.socket.on('post-notification', () => {
      console.log('ding!');
      callback();
    });
  }

  onCommentNotification(callback) {
    this.socket.on('comment-notification', () => {
      callback();
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
}

export default SocketsService;