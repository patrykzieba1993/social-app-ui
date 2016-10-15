const fetch = require('isomorphic-fetch');
const FormData = require('form-data');

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
    return fetch('http://localhost:3000/authorization/register',{
      method: 'POST',
      body: formData,
    })
  }
}