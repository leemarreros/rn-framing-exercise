"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var express = require("express");
var bodyParser = require("body-parser");
var jimp = require("jimp");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = process.env.PORT || 5000;
var profileTest = require("./images/frames/image").profilePic64;
var frameImagesSquare = [
    "./images/frames/sanFranciscoSquare.png",
    "./images/frames/flowerSquare.png",
    "./images/frames/orangeSquare.png",
];
var frameImagesRound = [
    "./images/frames/sanFranciscoRound.png",
    "./images/frames/flowerRound.png",
    "./images/frames/orangeRound.png",
];
var jimpsSquare = [];
var jimpsRound = [];
frameImagesSquare.forEach(function (path) {
    jimpsSquare.push(jimp.read(path));
});
frameImagesRound.forEach(function (path) {
    jimpsRound.push(jimp.read(path));
});
app.listen(port, function () { return console.log("Listening on port " + port); });
app.post("/getImageWithFrame", function (req, res) {
    var jimps = [];
    var type = req.query.type;
    var frameNumber = req.query.frameNumber;
    if (type === "Round") {
        jimps.push(jimpsRound[frameNumber - 1]);
    }
    else {
        jimps.push(jimpsSquare[frameNumber - 1]);
    }
    jimps.push(jimp.read(Buffer.from(req.body.base, "base64")));
    Promise.all(__spreadArray([], jimps))
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
app.get("/geRoundframes", function (req, res) {
    res.send({ response: "Mergin frame into sent picture" });
});
