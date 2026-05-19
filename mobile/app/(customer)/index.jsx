import React, { useEffect, useState } from "react";
import {SafeAreaView, FlatList, Text, View, StyleSheet} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import socket from "../../lib/socket";
import SERVER_URL from "../../constants/config";
import OrderForm from "../../components/OrderForm";
import QueueItem from "../../components/QueueItem";

export default function CustomerIndex() {
  const router = useRouter();
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

  async function handlePlaceOrder(name, type) {
    const res = await axios.post(`${SERVER_URL}/add-item`, { name, type });
    const itemId = res.data.item.id;
    // Go to status screen with my item ID
    router.push({ pathname: "/(customer)/status", params: { itemId } });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.bar, connected ? styles.green : styles.red]}>
        <Text style={styles.barText}>
          {connected ? "🟢 Connected" : "🔴 Disconnected"}
        </Text>
      </View>

      <OrderForm onSubmit={handlePlaceOrder} />

      <Text style={styles.queueTitle}>
        Live Queue ({queue.filter((i) => i.status === "pending").length} pending)
      </Text>

      <FlatList
        data={queue.filter((i) => i.status !== "completed")}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <QueueItem item={item} index={index} isMyItem={false} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Queue is empty</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  bar: { padding: 8, alignItems: "center" },
  green: { backgroundColor: "#d4edda" },
  red: { backgroundColor: "#f8d7da" },
  barText: { fontWeight: "600", fontSize: 13 },
  queueTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 6,
    color: "#555",
  },
  empty: { textAlign: "center", color: "#aaa", marginTop: 40 },
});