import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (!res.ok) {
        set({ authUser: null });
        return;
      }
      const data = await res.json();
      set({ authUser: data });
    } catch (err) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const resData = await res.json();
      set({ authUser: resData.user });
      toast.success("Account created successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const resData = await res.json();
      set({ authUser: resData.user });
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err.message);
    }
  },
  updateProfile: async (fileData) => {
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fileData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      set({ authUser: data.updatedUser });
      toast.success("Profile updated successfully");
    } catch (err) {
      console.log("Error in update profile : ", err.message);
      toast.error("Something went wrong. Please try again!");
    }
  },
}));
