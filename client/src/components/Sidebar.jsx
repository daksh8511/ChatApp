import React, { useEffect } from "react";
import useChat from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";
import useAuth from "../store/useAuthStore";

const Sidebar = () => {
  const { users, selectedUser, isUsersLoading, setSelectedUser, getUser } =
    useChat();

  const {onlineUsers} = useAuth()

  
  useEffect(() => {
    getUser();
  }, [getUser]);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }



  return (
    <div className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 p-5 w-full">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contact</span>
        </div>
      </div>
      <div className="overflow-y-auto p-3 w-full">
        {users.map((user) => {
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 transition-colors hover:bg-base-300 ${
                selectedUser?._id == user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              } `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />

                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
                )}
              </div>
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
