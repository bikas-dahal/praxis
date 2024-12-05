import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

const ChatPage = async () => {
  const people = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Chat</h1>
        <p className="text-sm text-gray-500">Connect with your friends and peers</p>
      </header>

      {/* User List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {people.map((person) => (
          <li key={person.id} className="bg-white shadow rounded-lg hover:shadow-lg transition">
            <Link href={`/dashboard/chat/${person.id}`}>
              <div className="p-4 flex items-center space-x-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <Image
                    src={person.image || '/images/avatar.png'}
                    alt={person.name!}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                </div>

                {/* User Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{person.name}</h2>
                  <p className="text-sm text-gray-500">Click to start chatting</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatPage;
