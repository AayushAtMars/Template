import { Redirect } from "expo-router";

// Redirect root to customer section
export default function Index() {
  return <Redirect href="/(customer)/" />;
}