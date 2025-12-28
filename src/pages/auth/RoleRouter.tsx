import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const RoleRouter = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const routeByRole = async () => {
      if (isLoading) return;
      
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const { data: roles, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (error) throw error;

        const userRoles = roles?.map(r => r.role) || [];

        if (userRoles.includes('admin')) {
          navigate('/admin');
        } else if (userRoles.includes('restaurant')) {
          navigate('/restaurant');
        } else {
          navigate('/home');
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
        navigate('/home');
      }
    };

    routeByRole();
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <p className="text-muted-foreground">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default RoleRouter;
