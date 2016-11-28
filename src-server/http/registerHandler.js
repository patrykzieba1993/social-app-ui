const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

const saveAvatar = (avatar, name) => {
  var base64Data = avatar.replace(/^data:image\/jpeg;base64,/, "");
  require("fs").writeFile(`public/${name}.jpg`, base64Data, 'base64');
}

const registerHandler = (req, res) => {
  const formData = new FormData();
  formData.append('firstName', req.body.firstName || null);
  formData.append('lastName', req.body.lastName || null);
  formData.append('login', req.body.login || null);
  formData.append('password', req.body.password || null);
  formData.append('email', req.body.email || null);
  formData.append('birthDate', req.body.birthDate || null);
  formData.append('sex', req.body.sex || null);
  
  fetch('http://localhost:3000/authorization/register', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      saveAvatar(req.body.avatar, req.body.login);
      res.status(response.status);
      res.send();
    })
};

module.exports = registerHandler;
