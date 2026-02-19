import toast from "react-hot-toast";
import { create } from "zustand";

export const useChatStore = create((set) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await fetch("/api/messages/contacts");
      if (!res.ok) {
        set({ allContacts: [] });
        return;
      }
      const data = await res.json();
      set({ allContacts: data });
    } catch (err) {
      set({ allContacts: [] });
      toast.error(err.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await fetch("/api/messages/chats");
      if (!res.ok) {
        set({ chats: [] });
        return;
      }
      const data = await res.json();
      set({ chats: data });
    } catch (err) {
      set({ chats: [] });
      toast.error(err.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
}));
