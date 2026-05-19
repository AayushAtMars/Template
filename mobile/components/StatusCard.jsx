import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatusCard({ item, position }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Name</Text>
      <Text style={styles.value}>{item.name}</Text>

      <Text style={styles.label}>Type</Text>
      <Text style={styles.value}>{item.type}</Text>

      <Text style={styles.label}>Status</Text>
      <Text style={[styles.value, styles[item.status]]}>{item.status}</Text>

      {position && (
        <>
          <Text style={styles.label}>Queue Position</Text>
          <Text style={styles.value}>#{position}</Text>
        </>
      )}

      <Text style={styles.label}>Priority Score</Text>
      <Text style={styles.value}>{item.priority}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 20, elevation: 2 },
  label: { fontSize: 12, color: "#888", marginTop: 12 },
  value: { fontSize: 18, fontWeight: "bold", color: "#333" },
  pending: { color: "#ffc107" },
  assigned: { color: "#007bff" },
  completed: { color: "#28a745" },
});