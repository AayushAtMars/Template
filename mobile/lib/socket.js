import { io } from "socket.io-client";
import SERVER_URL from "../constants/config";

// Single socket instance shared across all screens
const socket = io(SERVER_URL);

export default socket;