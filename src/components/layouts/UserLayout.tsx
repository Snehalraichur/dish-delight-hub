import { ReactNode } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Wallet, CalendarDays, User, Bell, LogOut, Settings, Menu, X, PlusCircle, Flame, Gift, Bookmark, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface UserLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/feed', icon: Home, label: 'Home' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/wallet', icon: Wallet, label: 'Wallet' },
  { path: '/events', icon: CalendarDays, label: 'Events' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const menuItems = [
  { path: '/create-post', icon: PlusCircle, label: 'Create Post' },
  { path: '/streaks', icon: Flame, label: 'Streaks & Rewards' },
  { path: '/rewards', icon: Gift, label: 'Rewards Points' },
  { path: '/saved', icon: Bookmark, label: 'Saved Posts' },
  { path: '/settings', icon: Settings, label: 'Settings' },
  { path: '/support', icon: HelpCircle, label: 'Help & Support' },
];

export function UserLayout({ children }: UserLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Failed to logout');
    } else {
      toast.success('Logged out successfully');
      navigate('/login');
    }
  };

  const handleMenuNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gradient">SnapDish</h1>
          <div className="flex items-center gap-2">
            <NavLink 
              to="/notifications" 
              className="p-2 hover:bg-muted rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </NavLink>
            
            {isProfilePage ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 hover:bg-muted rounded-full transition-colors">
                  <User className="w-5 h-5 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 hover:bg-muted rounded-full transition-colors">
                    <Menu className="w-5 h-5 text-muted-foreground" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] p-0">
                  <SheetHeader className="p-4 border-b border-border">
                    <SheetTitle className="text-left text-gradient">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="py-2">
                    {menuItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleMenuNavigation(item.path)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted",
                          location.pathname === item.path && "bg-primary/10 text-primary"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                    <div className="border-t border-border mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </header>

      {/* Desktop/Tablet Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gradient">SnapDish</h1>
            <nav className="flex items-center gap-8">
              {navItems.filter(item => item.path !== '/profile').map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  cn(
                    "p-2 rounded-full transition-colors relative hover:bg-muted",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )
                }
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </NavLink>
              
              {isProfilePage ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-2 hover:bg-muted rounded-full transition-colors">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild>
                    <button className="p-2 hover:bg-muted rounded-full transition-colors">
                      <Menu className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[320px] p-0">
                    <SheetHeader className="p-4 border-b border-border">
                      <SheetTitle className="text-left text-gradient">Menu</SheetTitle>
                    </SheetHeader>
                    <div className="py-2">
                      {menuItems.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleMenuNavigation(item.path)}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted",
                            location.pathname === item.path && "bg-primary/10 text-primary"
                          )}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </button>
                      ))}
                      <div className="border-t border-border mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-20 pb-20 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className={cn(
                    "p-2 rounded-full transition-all",
                    isActive && "bg-primary/10"
                  )}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
