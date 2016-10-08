require('dotenv')
  .load({ silent: true });
const express = require('express');

const start = () => {
  const app = express();
  app.listen(process.env.PORT, () => console.log(`App listening on ${process.env.PORT} port`));
}

start();