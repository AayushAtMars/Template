import express from "express";

const router = express.Router();

import {getQueue, addItem, assignItem, completeItem} from "../controllers/queueController.js";

// Get full queue
router.get("/queue", (req, res) => {
  res.json(getQueue());
});

// Add new item (customer places order)
router.post("/add-item", (req, res) => {
  const { name, type } = req.body;

  const item = addItem(name, type);

  const io = req.app.get("io");
  io.emit("queue_update", getQueue());

  res.json({
    success: true,
    item,
  });
});

// Admin assigns an item
router.post("/assign/:id", (req, res) => {
  const result = assignItem(parseInt(req.params.id));

  if (result.error)
    return res.status(400).json(result);

  const io = req.app.get("io");
  io.emit("queue_update", getQueue());

  res.json({
    success: true,
    item: result,
  });
});

// Admin marks item complete
router.post("/complete/:id", (req, res) => {
  const result = completeItem(parseInt(req.params.id));

  if (result.error)
    return res.status(400).json(result);

  const io = req.app.get("io");
  io.emit("queue_update", getQueue());

  res.json({
    success: true,
    item: result,
  });
});

export default router;