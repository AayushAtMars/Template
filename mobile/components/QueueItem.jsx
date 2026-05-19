import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function QueueItem({ item, index, isMyItem }) {
  return (
    <View style={[styles.row, isMyItem && styles.highlighted]}>
      <Text style={styles.pos}>#{index + 1}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.type.toUpperCase()}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.priority}>P: {item.priority}</Text>
        <Text style={[styles.status, styles[item.status]]}>{item.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginHorizontal: 16, marginBottom: 8, padding: 14, borderRadius: 10, elevation: 1 },
  highlighted: { borderLeftWidth: 4, borderLeftColor: "#007bff" },
  pos: { fontSize: 16, fontWeight: "bold", color: "#888", width: 32 },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: "600" },
  type: { fontSize: 12, color: "#888", marginTop: 2 },
  right: { alignItems: "flex-end" },
  priority: { fontSize: 12, color: "#555" },
  status: { fontSize: 12, fontWeight: "bold", marginTop: 4 },
  pending: { color: "#ffc107" },
  assigned: { color: "#007bff" },
  completed: { color: "#28a745" },
});