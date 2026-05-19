import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import socket from "../../lib/socket";
import StatusCard from "../../components/StatusCard";

export default function StatusScreen() {
  const { itemId } = useLocalSearchParams();
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    socket.on("queue_update", (updatedQueue) => setQueue(updatedQueue));
    return () => socket.off("queue_update");
  }, []);

  const myItem = queue.find((i) => i.id === parseInt(itemId));
  const myPosition = queue
    .filter((i) => i.status === "pending")
    .findIndex((i) => i.id === parseInt(itemId));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Your Order</Text>
      {myItem ? (
        <StatusCard
          item={myItem}
          position={myPosition >= 0 ? myPosition + 1 : null}
        />
      ) : (
        <Text style={styles.notFound}>Order not found</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  notFound: { textAlign: "center", color: "#aaa", marginTop: 40 },
});