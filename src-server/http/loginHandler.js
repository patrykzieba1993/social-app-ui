const fetch = require('node-fetch');
const FormData = require('form-data');

const loginHandler = (req, res) => {
  const formData = new FormData();
  formData.append('login', req.body.login);
  formData.append('password', req.body.password);

  fetch('http://localhost:3000/authorization/login', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return res.redirect('/login/loginFailure');
    })
    .then(data => res.redirect(`/dashboard/home/${data.id}`))
    .catch(err => res.redirect('/login/loginFailure'));
};

module.exports = loginHandler;