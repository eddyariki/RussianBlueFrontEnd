const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
// create application/json parser
var jsonParser = bodyParser.json();

let review = {
  reviewId: -100,
  title: "mock title",
  content: "mock",
  itemCode: "feeling-mellow:10065636",
  userId: 800,
};
app.post("/user/login", jsonParser, (req, res) => {
  console.log("login", req.body);
  res.json({
    username: req.body.username,
    userId: 800,
    points: 800,
  });
});

app.post("/user/register", jsonParser, (req, res) => {
  console.log("register", req.body);
  res.json({
    username: req.body.username,
    userId: 800,
    points: 800,
  });
});

app.post("/api/review", jsonParser, (req, res) => {
  console.log("post review", req.body);
  review = {
    reviewId: 200,
    title: req.body.title,
    content: req.body.content,
    itemCode: req.body.itemCode,
    userId: req.body.userId,
  };
  res.json(review);
});

app.put("/api/review/update/:reviewId", jsonParser, (req, res) => {
  console.log("post review", req.body);
  review = {
    reviewId: req.params.reviewId,
    title: req.body.title,
    content: req.body.content,
    itemCode: req.body.itemCode,
    userId: req.body.userId,
  };
  res.json(review);
});
app.delete("/api/review/delete/:reviewId", jsonParser, (req, res) => {
  console.log("delete review", req.params.reviewId);

  res.json({ message: "deleted" });
});
app.get("/api/review/:reviewId", (req, res) => {
  console.log("review get", req.params);
  res.json(review);
});

// app.post("/api/referral/", jsonParser, (req, res) => {
//   console.log("referral", req.body);
//   res.json({
//     message: "ok",
//   });
// });

app.put("/refer/:userId", (req, res) => {
  console.log(req.query);
  console.log(req.params);
  const userId = req.params.userId;
  console.log("referred", userId);
  res.json([review, review, review, review, review, review, review]);
});

let server = app.listen(4000, function () {
  console.log("server listening on port 4000");
});
