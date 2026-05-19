import { Tabs } from "expo-router";

export default function CustomerLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Place Order" }} />
      <Tabs.Screen name="status" options={{ title: "My Order Status" }} />
    </Tabs>
  );
}