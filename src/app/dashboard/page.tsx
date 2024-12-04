import 'server-only'

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardCards } from "@/components/dashboard/Cards";
import { getUserSession } from "@/actions/auth/session";
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
 
export default async function Dashboard() {
  const session = await getUserSession();

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      
      <DashboardHeader user={session?.user} />
      <Suspense fallback={<Loader2 className="w-full size-4 flex items-center justify-between animate-spin" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCards />
        </div>
      </Suspense>
    </div>
  );
}
