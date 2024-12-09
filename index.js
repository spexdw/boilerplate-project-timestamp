const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


app.use(cors({ optionsSuccessStatus: 200 }));


app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;
  let date;


  if (!dateParam) {
    date = new Date();
  } else {

    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {

      date = new Date(dateParam);
    }
  }


  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }


  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
