"use client";

import { BarChart, FolderKanban, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "../Navbar/Logo";
import Link from "next/link";

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const NavItem = ({
    href,
    icon,
    label,
  }: {
    href: string;
    icon: React.ReactNode;
    label: string;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-700 hover:text-white  ${
          isActive ? "bg-gray-600 text-white " : ""
        }`}
        href={href}
      >
        {icon}
        <span className="mx-2 text-sm font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full lg:w-1/5 z-30">
      {/* <!-- Sidebar content open --> */}
      <div
        className={`absolute top-5 left-5 z-20 bg-white p-2 rounded-full block lg:hidden hover:cursor-pointer`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="close"
      >
        {!isSidebarOpen ? <Menu /> : <X />}
      </div>
      <aside
        className={`flex h-screen fixed flex-col border-r bg-slate-200 px-5 py-8 overflow-y-auto ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <Logo />

        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-700">
                Analytics
              </label>
              <NavItem
                href="/dashboard"
                icon={<BarChart className="h-5 w-5" aria-hidden="true" />}
                label="Dashboard"
              />
            </div>
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-700">
                User Management
              </label>
              <NavItem
                href="/dashboard/users-management"
                icon={<FolderKanban className="h-5 w-5" aria-hidden="true" />}
                label="All Users"
              />
            </div>
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-700">
                Post Management
              </label>
              <NavItem
                href="/dashboard/post-management"
                icon={<FolderKanban className="h-5 w-5" aria-hidden="true" />}
                label="All Posts"
              />
            </div>
            <div className="space-y-3 ">
              <label className="px-3 text-xs font-semibold uppercase text-gray-700">
                Payment History
              </label>
              <NavItem
                href="/dashboard/payment-management"
                icon={<FolderKanban className="h-5 w-5" aria-hidden="true" />}
                label="All Payments"
              />
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
}
