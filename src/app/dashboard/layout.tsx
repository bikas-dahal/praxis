import { DashboardHeader } from '@/components/dashboard/header';
import { UserButton } from '@/components/user-button';
import Link from 'next/link';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200">
        <nav className="flex justify-between items-center h-12 px-20 bg-white shadow-lg rounded-lg">
          <div className='flex items-center justify-center'>
          <DashboardHeader />
          <Link href="/dashboard">
            <span className="text-2xl mx-10 font-extrabold text-indigo-600 hover:text-indigo-800 transition">
              Praxis
            </span>
          </Link>

          </div>
          <UserButton />
        </nav>
        <main className=" px-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
