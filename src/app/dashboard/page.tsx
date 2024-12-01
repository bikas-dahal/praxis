
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardCards } from "@/components/dashboard/Cards";
import { getUserSession } from "@/actions/auth/session";
 
export default async function Dashboard() {
  const session = await getUserSession();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      <DashboardHeader user={session?.user} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCards />
      </div>
    </div>
  );
}
