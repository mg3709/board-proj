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

app.post("/api/write-board", async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(BOARD_DOMAIN);
    const db = client.db();
    const boardCollection = db.collection("board");
    const result = await boardCollection.insertOne(data);
    console.log(result);
    client.close();
    res.json({ message: "WRITE SUCCESS" });
  }
});

app.post("/api/write-book", async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(BOOK_DOMAIN);
    const db = client.db();
    const bookCollection = db.collection("book");
    const result = await bookCollection.insertOne(data);
    console.log(result);
    client.close();
    res.json({ message: "WRITE SUCCESS" });
  }
});

app.get("/api/get-board", async (req, res) => {
  if (req.method === "GET") {
    const client = await MongoClient.connect(BOARD_DOMAIN);
    const db = client.db();
    const boardCollection = db.collection("board");
    const result = await boardCollection.find().toArray();
    console.log(result);
    client.close();
    res.json(result);
  }
});

app.get("/api/get-book", async (req, res) => {
  if (req.method === "GET") {
    const client = await MongoClient.connect(BOOK_DOMAIN);
    const db = client.db();
    const bookCollection = db.collection("book");
    const result = await bookCollection.find().toArray();
    console.log(result);
    client.close();
    res.json(result);
  }
});

app.get("/api/detail-board/:id", async (req, res) => {
  if (req.method === "GET") {
    const id = req.params.id;
    const client = await MongoClient.connect(BOARD_DOMAIN);
    const db = client.db();
    const boardCollection = db.collection("board");
    const result = await boardCollection.findOne({ _id: new ObjectId(id) });
    console.log(result);
    client.close();
    res.json(result);
  }
});

app.get("/api/detail-book/:id", async (req, res) => {
  if (req.method === "GET") {
    const id = req.params.id;
    const client = await MongoClient.connect(BOOK_DOMAIN);
    const db = client.db();
    const bookCollection = db.collection("book");
    const result = await bookCollection.findOne({ _id: new ObjectId(id) });
    console.log(result);
    client.close();
    res.json(result);
  }
});

app.put("/api/board-comment/:id", async (req, res) => {
  if (req.method === "PUT") {
    const id = req.params.id;
    const data = req.body;
    const client = await MongoClient.connect(BOARD_DOMAIN);
    const db = client.db();
    const boardCollection = db.collection("board");

    const filter = { _id: new ObjectId(id) };
    //데이터가 덮어씌워지지 않고 제대로 추가만 할 수 있도록 update 연산자 $push 사용
    const update = {
      $push: { comment: data },
    };

    //updateOne(해당하는 ID, update 할 내용)
    const result = await boardCollection.updateOne(filter, update);
    console.log(result);
    client.close();
    res.json({ message: "update success" });
  }
});

app.put("/api/book-comment/:id", async (req, res) => {
  if (req.method === "PUT") {
    const id = req.params.id;
    const data = req.body;
    const client = await MongoClient.connect(BOOK_DOMAIN);
    const db = client.db();
    const bookCollection = db.collection("book");

    const filter = { _id: new ObjectId(id) };
    const update = {
      $push: { comment: data },
    };

    const result = await bookCollection.updateOne(filter, update);
    console.log(result);
    client.close();
    res.json({ message: "update success" });
  }
});

app.listen(port, () => {
  console.log(`Server is Running ${port}`);
});
