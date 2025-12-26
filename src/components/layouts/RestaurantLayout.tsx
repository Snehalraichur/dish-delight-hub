import { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Tag, 
  Image, 
  BarChart3, 
  MessageSquare,
  Star,
  UtensilsCrossed,
  Users,
  Settings,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface RestaurantLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/restaurant/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/restaurant/deals', icon: Tag, label: 'Deals' },
  { path: '/restaurant/content', icon: Image, label: 'UGC' },
  { path: '/restaurant/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/restaurant/messages', icon: MessageSquare, label: 'Messages' },
  { path: '/restaurant/reviews', icon: Star, label: 'Reviews' },
  { path: '/restaurant/menu', icon: UtensilsCrossed, label: 'Menu' },
  { path: '/restaurant/staff', icon: Users, label: 'Staff' },
  { path: '/restaurant/settings', icon: Settings, label: 'Settings' },
];

export function RestaurantLayout({ children }: RestaurantLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <h1 className="text-xl font-bold text-gradient">SnapDish Business</h1>
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
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border transition-transform duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h1 className="text-xl font-bold text-gradient">SnapDish</h1>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm font-medium text-foreground">Need help?</p>
              <p className="text-xs text-muted-foreground mt-1">Contact our support team</p>
              <Button variant="default" size="sm" className="w-full mt-3">
                Get Support
              </Button>
            </div>
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
