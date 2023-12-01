const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();

const port = 8081;
const BOARD_DOMAIN =
  "mongodb+srv://user1:user11@atlascluster.rejelqj.mongodb.net/board?retryWrites=true&w=majority";
const BOOK_DOMAIN =
  "mongodb+srv://user1:user11@atlascluster.rejelqj.mongodb.net/book?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is Running ${port}`);
});
