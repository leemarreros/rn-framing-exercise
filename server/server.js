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
const profile = [];

frameImagesSquare.forEach(function (path) {
  jimpsSquare.push(jimp.read(path));
});

frameImagesRound.forEach(function (path) {
  jimpsRound.push(jimp.read(path));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/getSquareframes", (req, res) => {
  profile.push(jimp.read(Buffer.from(req.body.base, "base64")));
  Promise.all([...profile, ...jimpsSquare])
    .then(function (data) {
      const imageBase1 = data[0].clone();
      const imageBase2 = data[0].clone();
      const imageBase3 = data[0].clone();

      imageBase1.composite(data[1], 0, 0);
      imageBase2.composite(data[2], 0, 0);
      imageBase3.composite(data[3], 0, 0);

      Promise.all([
        imageBase1.getBase64Async(jimp.MIME_PNG),
        imageBase2.getBase64Async(jimp.MIME_PNG),
        imageBase3.getBase64Async(jimp.MIME_PNG),
      ])
        .then(function (result) {
          console.log("0", result[0].substring(0, 20));
          console.log("1", result[1].substring(0, 20));
          console.log("2", result[2].substring(0, 20));
        })
        .catch(function (error) {
          console.log("Error converting to base64", error);
        });
    })
    .catch(function (error) {
      console.log("Error reading paths", error);
    });
  res.send({ response: "Mergin frame into sent picture" });
});

app.get("/geRoundframes", (req, res) => {
  res.send({ response: "Mergin frame into sent picture" });
});
