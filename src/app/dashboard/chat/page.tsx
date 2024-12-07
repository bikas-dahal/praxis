import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PresenceDot from "@/components/chat/presence-dot";

const ChatPage = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/login");
  }

  const people = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },
    where: {
      NOT: {
        id: session?.user?.id,
      },
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
          <li
            key={person.id}
            className="bg-white shadow rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Link href={`/dashboard/chat/${person.id}`}>
              <div className="p-4 flex flex-col items-center text-center">
                {/* User Avatar */}
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={person.image || "/images/avatar.png"}
                    alt={person.name!}
                    fill
                    className="rounded-full object-cover"
                  />
                  <PresenceDot id={person.id} />
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
