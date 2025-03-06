const express = require("express");
const request = require("request");
const app = express();
const port = process.env.PORT || 3001;
const delay = process.env.DELAY || "60000";
const host = process.env.HOST || 'google.com';

app.use((req, res, next) => {
  setTimeout(next, parseInt(delay));
});

app.use((req, res) => {
  const options = {
    url: `https://${host}` + req.url,
    headers: { ...req.headers, host },
    method: req.method
  };

  req.pipe(request(options)).pipe(res);
});

app.listen(port, () => {
  console.log(`slow-server reverse proxy running on port ${port}`);
});