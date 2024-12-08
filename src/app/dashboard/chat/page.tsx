// ChatPage.tsx (Server Component)
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PresenceDot from "@/components/chat/presence-dot";
import { FilterWrapper } from "@/components/chat/filter-wrapper";
import { PaginationComponent } from "@/components/pagination";
// import { GetMemberParams } from "@/types";
import { getMembers } from "@/actions/messageActions";

// type SearchParam = Promise<{ slug: string }>

type SearchParams = Promise<{ 
  dateRange?: string;
  nature?: string;
  orderBy?: 'updated' | 'created';
  withPhoto?: boolean;
  pageNumber?: number;
  pageSize?: number;
}>

const ChatPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/login");
  }

  // Fetch members and pagination data
  const searchParam = await searchParams;
  const { items: members, totalCount, page, pageSize } = await getMembers( searchParam);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Chat</h1>
        <div className="text-sm text-gray-500">Connect with your friends and peers</div>
      </header>

      {/* Filters */}
      <FilterWrapper totalCount={totalCount} />

      {/* User List */}
      {members.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((person) => (
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
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <PresenceDot id={person.id} />
                  </div>

                  {/* User Info */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{person.name}</h2>
                    <div className="text-sm text-gray-500">
                      {person.nature === "writer" ? "Reader and writer" : "Reader"}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500">No members found matching your criteria.</div>
      )}

      {/* Pagination */}
      <PaginationComponent
        totalCount={totalCount}
        currentPage={page!}
        pageSize={pageSize!}
      />
    </div>
  );
};

export default ChatPage;
