import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import useAuth  from "./useAuthStore";

const useChat = create((set, get) => ({
  message: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUser: async () => {
    set({ isUsersLoading: true });

    try {
      const response = await axiosInstance.get("/message/users");
      set({ users: response.data });
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const response = await axiosInstance.get(`/message/${userId}`);
      set({ message: response.data.message });
    } catch (error) {
      toast.error(error.response.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser: selectedUser });
  },

  sendMessage: async (messageData) => {
    const { selectedUser, message } = get();

    try {
      const response = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      console.log(response)
      set({ message: [...message, response.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuth.getState().socket;

    socket.on("NewMessage", (NewMessage) => {
      set({ message: [...get().message, NewMessage] });
    });
  },

  unsubscribeFromMessages : () => {
    const socket = useAuth.getState().socket;
    socket.off("NewMessage")
  }
}));

export default useChat;
