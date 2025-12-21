//admin/admin-dashboard
import React from 'react';
import Link from 'next/link';
import { HomeIcon, UserIcon, FileTextIcon, CalendarIcon, CreditCardIcon, SettingsIcon, MessageSquareIcon } from 'lucide-react';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: HomeIcon },
  { href: '/admin/tenants', label: 'Tenants', icon: UserIcon },
  { href: '/admin/applications', label: 'Applications', icon: FileTextIcon },
  { href: '/admin/payments', label: 'Rent Payments', icon: CreditCardIcon },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquareIcon },
  { href: '/admin/updates', label: 'Announcements', icon: CalendarIcon },
  { href: '/admin/settings', label: 'Settings', icon: SettingsIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-black text-white w-80 p-3">
        <h1 className="font-bold text-2xl mb-6">Admin Dashboard</h1>
        <span className="font-semibold block mb-3 text-blue-300">Menu</span>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="p-2 flex items-center gap-2 rounded hover:bg-gray-800 hover:text-blue-400 transition"
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-[#060219] text-white">
        {children}
      </main>
    </div>
  );
}
