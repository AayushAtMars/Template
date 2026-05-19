import {
  getQueue,
  startAgingTimer,
} from "../controllers/queueController.js";

function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Send current queue to new client
    socket.emit("queue_update", getQueue());

    socket.on("disconnect", () => {
      console.log(
        "Client disconnected:",
        socket.id
      );
    });
  });

  // Start aging timer
  startAgingTimer((updatedQueue) => {
    io.emit("queue_update", updatedQueue);
  });
}

export { initSocket };