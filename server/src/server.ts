import express from "express";
import jimp from "jimp";
import { ShapeType, arrayFrameNames, ShapeEnum, responseFrameI } from './types/types';


const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const port = process.env.PORT || 5000;
const shape: ShapeType[] = [ShapeEnum.ROUND, ShapeEnum.SQUARE]

const jimpsSquare: jimp[] = [];
const jimpsRound: jimp[] = [];
const pathToImages = './images/frames/';

shape.forEach((sh: ShapeType) => {
  arrayFrameNames.forEach(frameName => {
    if (sh === ShapeEnum.ROUND && frameName !== 'None') {
      // @ts-ignore
      jimpsRound.push(jimp.read(`${pathToImages}${frameName}-${sh}.png`));
    } else if (sh === ShapeEnum.SQUARE && frameName !== 'None') {
      // @ts-ignore
      jimpsSquare.push(jimp.read(`${pathToImages}${frameName}-${sh}.png`));
    }
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`, "0.0.0.0"));

app.post("/getImageWithFrame", async (req, res) => {
  const jimps: jimp[] = [];
  const type = req.query.type;
  const frameNumber = req.query.frameNumber;

  if (type === ShapeEnum.ROUND) {
    jimps.push(jimpsRound[Number(frameNumber) - 1]);
  } else {
    jimps.push(jimpsSquare[Number(frameNumber) - 1]);
  }
  jimps.push(await jimp.read(Buffer.from(req.body.base, "base64")));
  Promise.all([...jimps])
    .then(function (data) {
      data[1].composite(data[0], 0, 0);
      data[1]
        .getBase64Async(jimp.MIME_PNG)
        .then(function (result: string) {
          let ans: responseFrameI = { response: result }
          res.send(ans);
        })
        .catch(function (error: Error) {
          console.log("Error converting to base64", error);
        });
    })
    .catch(function (error: Error) {
      console.log("Error reading paths", error);
    });
});
