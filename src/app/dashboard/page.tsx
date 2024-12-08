import 'server-only';
import { DashboardCards } from "@/components/dashboard/Cards";
import { getUserSession } from "@/actions/auth/session";
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="w-10 h-10 text-gray-500 animate-spin" />
          </div>
        }
      >
        <div className="max-w-7xl mx-auto">
          <DashboardCards />
        </div>
      </Suspense>
    </div>
  );
}
