const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();
const port = 3001;

app
  .use(cors())
  .use(router)
  .listen(port, () => console.log(`Express app listinging on port ${port}`));
