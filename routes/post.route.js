const express = require("express");
const { PostModel } = require("../models/post.model");
const postRoute = express();

postRoute.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const data = new PostModel(payload);
    await data.save();
    res.status(200).send({ msg: "New post added" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.get("/", async (req, res) => {
  const userId = req.body;
  console.log(userId);
  try {
    const post = await PostModel.find({ userId: userId.userId });
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.patch("/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  const payload = req.body;
  try {
    await PostModel.findByIdAndUpdate({ _id: userId }, payload);
    res.status(200).send({ msg: "Post is updated" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.delete("/delete/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    await PostModel.findByIdAndDelete({ _id: postId });
    res.status(200).send({ msg: "Post is deleted" });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});
postRoute.get("/filter", async (req, res) => {
  const userId = req.body;
  try {
    const data = await PostModel.find({
      no_of_comments: { $gt: 0, $lt: 5 },
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.get("/dev", async (req, res) => {
  const device = req.query.device;
  try {
    const data = await PostModel.find({ device: device });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.get("/dev", async (req, res) => {
  const device1 = req.query.device1;
  const device2 = req.query.device2;
  try {
    const data = await PostModel.find({ device: [device1, device2] });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

postRoute.get("/top", async (req, res) => {
  const userId = req.body;
  try {
    const data = await PostModel.find({ userId: userId.userId })
      .sort({ no_of_comments: -1 })
      .limit(3);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});
module.exports = { postRoute };
