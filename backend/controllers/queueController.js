// In-memory queue - single source of truth
let queue = [];
let nextId = 1;

// Sort: higher priority first, FIFO if equal
function sortQueue() {
  queue.sort((a, b) => {
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }

    return a.timestamp - b.timestamp;
  });
}

export function getQueue() {
  sortQueue();
  return queue;
}

export function addItem(name, type) {
  const item = {
    id: nextId++,
    name: name || "Customer",
    type: type || "standard",
    priority: type === "express" ? 10 : 5,
    status: "pending",
    timestamp: Date.now(),
  };

  queue.push(item);
  sortQueue();

  return item;
}

export function assignItem(id) {
  const item = queue.find((i) => i.id === id);

  if (!item) {
    return { error: "Not found" };
  }

  if (item.status !== "pending") {
    return { error: "Not pending" };
  }

  item.status = "assigned";

  return item;
}

export function completeItem(id) {
  const item = queue.find((i) => i.id === id);

  if (!item) {
    return { error: "Not found" };
  }

  item.status = "completed";

  return item;
}

// Aging: priority increases every 10 sec
export function startAgingTimer(broadcastFn) {
  setInterval(() => {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.priority += 1;
      }
    });

    sortQueue();
    broadcastFn(queue);
  }, 10000);
}