import { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Shield, 
  AlertTriangle,
  Megaphone,
  CreditCard,
  Calendar,
  Bell,
  Settings,
  Menu,
  X,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: ReactNode;
}

const navGroups = [
  {
    title: 'Overview',
    items: [
      { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ]
  },
  {
    title: 'Management',
    items: [
      { path: '/admin/users', icon: Users, label: 'Users' },
      { path: '/admin/restaurants', icon: Store, label: 'Restaurants' },
      { path: '/admin/content', icon: Shield, label: 'Moderation' },
      { path: '/admin/fraud', icon: AlertTriangle, label: 'Fraud Detection' },
    ]
  },
  {
    title: 'Monetization',
    items: [
      { path: '/admin/campaigns', icon: Megaphone, label: 'Campaigns' },
      { path: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
      { path: '/admin/events', icon: Calendar, label: 'Events' },
    ]
  },
  {
    title: 'System',
    items: [
      { path: '/admin/notifications', icon: Bell, label: 'Notifications' },
      { path: '/admin/settings', icon: Settings, label: 'Settings' },
    ]
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);

  const toggleGroup = (title: string) => {
    setCollapsedGroups(prev =>
      prev.includes(title)
        ? prev.filter(g => g !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Admin Portal</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-foreground/50 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-foreground transition-transform duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full text-primary-foreground">
          {/* Logo */}
          <div className="p-6 border-b border-primary-foreground/10 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">SnapDish</h1>
              <p className="text-xs text-primary-foreground/60">Admin Portal</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 overflow-y-auto">
            {navGroups.map((group) => (
              <div key={group.title} className="mb-4">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/50 hover:text-primary-foreground/70"
                >
                  {group.title}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      collapsedGroups.includes(group.title) && "rotate-180"
                    )}
                  />
                </button>
                {!collapsedGroups.includes(group.title) && (
                  <div className="mt-1 space-y-1">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                          )
                        }
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-primary-foreground/10">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
