import React from "react";

const RealChatPage = ({ params }: { params: { id: string } }) => {

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Chat Header */}
      <header className="bg-white border-b shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800">Chat with User {params.id}</h1>
        <span className="text-gray-500 text-sm">User ID: {params.id}</span>
      </header>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {/* Example messages */}
        <div className="mb-4">
          <div className="bg-blue-500 text-white rounded-md p-3 w-fit max-w-xs">
            Hello! How are you?
          </div>
          <div className="text-gray-500 text-xs mt-1">You - 10:30 AM</div>
        </div>
        <div className="mb-4">
          <div className="bg-gray-200 rounded-md p-3 w-fit max-w-xs">
            I'm good, thanks! What about you?
          </div>
          <div className="text-gray-500 text-xs mt-1">Other User - 10:32 AM</div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white p-4 border-t">
        <form className="flex">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow p-2 border rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default RealChatPage;
