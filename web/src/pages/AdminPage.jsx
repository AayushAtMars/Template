import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../lib/socket";
import SERVER_URL from "../constants/config";
import Header from "../components/Header";
import StatsRow from "../components/StatsRow";
import QueueTable from "../components/QueueTable";

const AdminPage = ()=> {
  const [queue, setQueue] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
    socket.on("queue_update", (updatedQueue) => setQueue(updatedQueue));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("queue_update");
    };
  }, []);

  async function handleAssign(id) {
    await axios.post(`${SERVER_URL}/assign/${id}`);
  }

  async function handleComplete(id) {
    await axios.post(`${SERVER_URL}/complete/${id}`);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <Header connected={connected} />
      <StatsRow queue={queue} />
      <QueueTable
        queue={queue}
        onAssign={handleAssign}
        onComplete={handleComplete}
      />
    </div>
  );
}

export default AdminPage;