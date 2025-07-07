import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:4000" : "/";

const useAuth = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdateProfile: false,
  onlineUsers: [],
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set((state) => ({ authUser: res.data }));
      get().connectSocket();
    } catch (error) {
      console.log("Error In ChekcAuth:", error);
      set((state) => ({ authUser: null }));
    } finally {
      set((state) => ({ isCheckingAuth: false }));
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: data });
      toast.success("Account create successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ authUser: null, isLoggingIng: false });
      toast.success("Logged out successfully");
      get().disConnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login: async (mydata) => {
    set({ isLoggingIng: true });
    try {
      const response = await axiosInstance.post("/auth/login", mydata);
      console.log(response);
      set({ authUser: response.data });
      toast.success("Login successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdateProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update_profile", {
        profilePic: data,
      });
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdateProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disConnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

export default useAuth;
