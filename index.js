const express = require("express");
const axios = require("axios");
const tf = require("@tensorflow/tfjs-node");
const nsfw = require("nsfwjs");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let _model;

app.post("/", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      res.status(400).send("Missing image url")
    }
    else {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer'
      });
      const image = await tf.node.decodeImage(response.data, 3);
      const predictions = await _model.classify(image);
      image.dispose();
      res.json(predictions);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
  
});

const load_model = async () => {
  _model = await nsfw.load();
};

// Keep the model in memory, make sure it's loaded only once
load_model().then(() => app.listen(80));