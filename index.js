const express = require('express');
const app = express();
const port = 8080;

app.use('/image-slider', express.static('image-slider'))

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App started at port http://localhost:${port}`);
  }
});

