import express from "express";
import bodyParser from "body-parser";
import jimp from "jimp";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

const frameImagesSquare:string[] = [
  "./images/frames/sanFranciscoSquare.png",
  "./images/frames/flowerSquare.png",
  "./images/frames/orangeSquare.png",
];
const frameImagesRound:string[] = [
  "./images/frames/sanFranciscoRound.png",
  "./images/frames/flowerRound.png",
  "./images/frames/orangeRound.png",
];

const jimpsSquare: jimp[] = [];
const jimpsRound: jimp[] = [];

frameImagesSquare.forEach(function (path) {
  // @ts-ignore
  jimpsSquare.push(jimp.read(path));
});

frameImagesRound.forEach(function (path) {
  // @ts-ignore
  jimpsRound.push(jimp.read(path));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/getImageWithFrame", async (req, res) => {
  const jimps: jimp[] = [];
  const type = req.query.type;
  const frameNumber = req.query.frameNumber;

  if (type === "Round") {
    console.log('Round', Number(frameNumber))
    jimps.push(jimpsRound[Number(frameNumber) - 1]);
  } else {
    console.log('Square', Number(frameNumber))
    jimps.push(jimpsSquare[Number(frameNumber) - 1]);
  }
  jimps.push(await jimp.read(Buffer.from(req.body.base, "base64")));
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
