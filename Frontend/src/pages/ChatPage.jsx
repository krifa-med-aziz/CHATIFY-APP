import { useAuthStore } from "../store/useAuthStore";

export default function ChatPage() {
  const { logout } = useAuthStore();
  return (
    <div>
      <h1>Chat Page</h1>
      <button
        onClick={logout}
        className="w-full cursor-pointer z-50 bg-cyan-500 text-white rounded-lg py-2.5 font-medium hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        LogOut
      </button>
    </div>
  );
}
