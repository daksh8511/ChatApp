import useChat from "../store/useChatStore";
import NoChat from "../components/NoChat";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const { selectedUser } = useChat();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChat /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
