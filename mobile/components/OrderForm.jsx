import React, { useState } from "react";
import {
  View, TextInput, TouchableOpacity,
  Text, StyleSheet, Alert,
} from "react-native";

export default function OrderForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("standard");

  async function handleSubmit() {
    if (!name.trim()) { Alert.alert("Enter your name"); return; }
    await onSubmit(name.trim(), type);
    setName("");
  }

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.typeRow}>
        {["standard", "express"].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.typeBtn, type === t && styles.selected]}
            onPress={() => setType(t)}
          >
            <Text style={styles.typeTxt}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnTxt}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { margin: 16, backgroundColor: "#fff", borderRadius: 12, padding: 16 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12, marginBottom: 12 },
  typeRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  typeBtn: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ddd", alignItems: "center" },
  selected: { backgroundColor: "#007bff", borderColor: "#007bff" },
  typeTxt: { fontWeight: "600", color: "#333" },
  btn: { backgroundColor: "#28a745", padding: 14, borderRadius: 8, alignItems: "center" },
  btnTxt: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});