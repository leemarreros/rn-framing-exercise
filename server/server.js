const express = require("express");
const bodyParser = require("body-parser");
const jimp = require("jimp");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
const profileTest = require("./images/frames/image").profilePic64;
const frameImagesSquare = [
  "./images/frames/sanFranciscoSquare.png",
  "./images/frames/flowerSquare.png",
  "./images/frames/orangeSquare.png",
];
const frameImagesRound = [
  "./images/frames/sanFranciscoRound.png",
  "./images/frames/flowerRound.png",
  "./images/frames/orangeRound.png",
];

const jimpsSquare = [];
const jimpsRound = [];

frameImagesSquare.forEach(function (path) {
  jimpsSquare.push(jimp.read(path));
});

frameImagesRound.forEach(function (path) {
  jimpsRound.push(jimp.read(path));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/getImageWithFrame", (req, res) => {
  const jimps = [];
  const type = req.query.type;
  const frameNumber = req.query.frameNumber;

  if (type === "Round") {
    jimps.push(jimpsRound[frameNumber - 1]);
  } else {
    jimps.push(jimpsSquare[frameNumber - 1]);
  }
  jimps.push(jimp.read(Buffer.from(req.body.base, "base64")));
  Promise.all([...jimps])
    .then(function (data) {
      data[1].composite(data[0], 0, 0);
      data[1]
        .getBase64Async(jimp.MIME_PNG)
        .then(function (result) {
          res.send({ response: result });
        })
        .catch(function (error) {
          console.log("Error converting to base64", error);
        });
    })
    .catch(function (error) {
      console.log("Error reading paths", error);
    });
});

app.get("/geRoundframes", (req, res) => {
  res.send({ response: "Mergin frame into sent picture" });
});
