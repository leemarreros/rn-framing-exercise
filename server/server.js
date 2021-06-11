const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/add_frame', (req, res) => {
  res.send({ response: 'Mergin frame into sent picture' });
});