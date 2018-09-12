/* eslint-disable import/no-extraneous-dependencies */
const Express = require('express');
const path = require('path');

const port = process.env.PORT;

const app = new Express();

app.get(`/*`, (req, res) => {
  if (/\.js$/.test(req.url)) {
    res.sendFile(path.join(__dirname, 'dist', req.url));
    return;
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

/* eslint-disable no-console */
app.listen(port, () => console.log(`App running on port ${port}`));
