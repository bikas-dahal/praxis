import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-gray-800 text-white p-4 flex flex-col">
      {/* Branding */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
          P
        </div>
        <h1 className="text-xl font-bold tracking-wide">Praxis</h1>
      </div>

      <Separator className="bg-gray-700 mb-6" />

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-2">
        <SidebarLink href="/dashboard" icon="📊">
          Dashboard
        </SidebarLink>
        <SidebarLink href="/dashboard/blogs" icon="✍️">
          Blogs
        </SidebarLink>
        <SidebarLink href="/dashboard/resources" icon="📚">
          Resources
        </SidebarLink>
      </nav>

      <Separator className="bg-gray-700 mt-6" />

      {/* Footer */}
      <footer className="mt-auto text-sm text-gray-400">
        <p>&copy; 2024 Praxis. All Rights Reserved.</p>
      </footer>
    </aside>
  );
};

const SidebarLink = ({
  href,
  children,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  icon?: string;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-gray-700 hover:text-indigo-400"
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-sm font-medium">{children}</span>
    </Link>
  );
};
