const express = require('express');
const router = require('./router');
const app = express();
const port = 3001;

app
  .use(router)
  .listen(port, () => console.log('Express app listinging on port', port));
