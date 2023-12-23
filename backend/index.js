const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();

//socket
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const socket_port = 8082;

const port = 8081;
const BOARD_DOMAIN =
  "mongodb+srv://user1:user11@atlascluster.rejelqj.mongodb.net/board?retryWrites=true&w=majority";
const BOOK_DOMAIN =
  "mongodb+srv://user1:user11@atlascluster.rejelqj.mongodb.net/book?retryWrites=true&w=majority";

//socket
io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
  socket.on("disconnection", ({ name }) => {
    io.emit("message", { name, message: "님이 나가셨습니다" });
  });
});

// 이미지를 저장할 디렉토리 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // uploads 폴더에 이미지 저장
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름 설정
  },
});
const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(cors());

// 이미지 업로드////////////////////////////////////////////////////////////////

app.post("/api/img-upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "이미지 파일이 없습니다." });
    }

    // 이미지 정보를 MongoDB에 저장하거나 필요한 동작 수행
    const imagePath = req.file.path; // 이미지 파일 경로
    const imageUrl = `http://ec2-52-79-47-176.ap-northeast-2.compute.amazonaws.com:${port}/${path.basename(
      imagePath
    )}`;

    // 이미지 URL
    res.status(200).json(imageUrl);
  } catch (error) {
    console.error("이미지 업로드 오류:", error);
    res.status(500).json({ error: "이미지 업로드 중 오류가 발생했습니다." });
  }
});

app.use(express.static(path.join(__dirname, "uploads")));

/////////////////////////////////////////////////////////////////////////////////

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

//hot content에 들어가는 상위 3개의 게시글
app.get("/api/hot-board", async (req, res) => {
  if (req.method === "GET") {
    const client = await MongoClient.connect(BOARD_DOMAIN);
    const db = client.db();
    const boardCollection = db.collection("board");
    const result = await boardCollection
      .aggregate([
        {
          $addFields: {
            commentCount: {
              $cond: {
                if: { $isArray: "$comment" },
                then: { $size: "$comment" },
                else: 0,
              },
            },
          },
        },
        {
          $sort: { commentCount: -1 },
        },
        {
          $limit: 3,
        },
      ])
      .toArray();
    console.log(result);
    client.close();
    res.json(result);
  }
});

app.get("/api/hot-book", async (req, res) => {
  if (req.method === "GET") {
    const client = await MongoClient.connect(BOOK_DOMAIN);
    const db = client.db();
    const bookCollection = db.collection("book");
    const result = await bookCollection
      .aggregate([
        {
          $addFields: {
            commentCount: {
              $cond: {
                if: { $isArray: "$comment" },
                then: { $size: "$comment" },
                else: 0,
              },
            },
          },
        },
        {
          $sort: { commentCount: -1 },
        },
        {
          $limit: 3,
        },
      ])
      .toArray();
    console.log(result);
    client.close();
    res.json(result);
  }
});

server.listen(socket_port, () => {
  console.log(`${socket_port} 번에서 socket 실행중...`);
});

app.listen(port, () => {
  console.log(`Server is Running ${port}`);
});
