const fetch = require('isomorphic-fetch');
const FormData = require('form-data');

const API_URL = 'http://localhost:3000';

const prepareFormData = (data, formData) => {
  for(let key in data) {
    let item = data[key];
    if(item != null && item != undefined && item != ''){
      formData.append(key, data[key]);    
    }
  }
};

export default class ApiService {
  static register(personalData) {
    const formData = new FormData();
    prepareFormData(personalData, formData);
    return fetch(`${API_URL}/authorization/register`, {
      method: 'POST',
      body: formData,
    })
  }
  
  static fetchPostsWithComments(id) {
    return fetch(`${API_URL}/dashboard/postsWithComments/${id}`, {
      method: 'GET'
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } // obsluga ...
      })
  }

  static fetchFriends(id) {
    return fetch(`${API_URL}/friendship/${id}`, {
      method: 'GET'
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
      });
  }

  static fetchMessages(senderId, receiverId) {
    return fetch(`${API_URL}/chat/messages/${senderId}/${receiverId}`, {
      method: 'GET'
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
      });
  }
}