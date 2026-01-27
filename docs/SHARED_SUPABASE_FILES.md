# Shared Supabase Configuration

All 3 apps (Customer, Merchant, Admin) share the same Supabase backend. Copy these files to each project.

## Environment Variables

Add to each project's environment settings:

```
VITE_SUPABASE_URL=https://hmedlhhcpoltalyxhaqr.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtZWRsaGhjcG9sdGFseXhoYXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MzczNDUsImV4cCI6MjA4MjMxMzM0NX0.avUfGCtrs9EdBrrBvfbh64O3UhKNhbMB8QvOOypaBio
```

---

## src/integrations/supabase/client.ts

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
```

---

## src/types/auth.ts

```typescript
export type UserRole = 'user' | 'restaurant' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

---

## src/lib/utils.ts

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## src/main.tsx

```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

---

## src/pages/NotFound.tsx

```tsx
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Link to="/">
            <Button>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

## Types File

Copy the entire `src/integrations/supabase/types.ts` file from the main project. This file is auto-generated and contains all the database types needed.

---

## Required Dependencies

Each project needs these packages installed:

```json
{
  "@supabase/supabase-js": "^2.89.0",
  "@tanstack/react-query": "^5.83.0",
  "framer-motion": "^12.23.26",
  "lucide-react": "^0.462.0",
  "react-router-dom": "^6.30.1",
  "sonner": "^1.7.4",
  "tailwind-merge": "^2.6.0",
  "clsx": "^2.1.1"
}
```

Plus all the shadcn/ui component dependencies.

---

## UI Components to Copy

Copy the entire `src/components/ui/` folder from the main project. This includes:

- accordion.tsx
- alert-dialog.tsx
- alert.tsx
- avatar.tsx
- badge.tsx
- button.tsx
- card.tsx
- checkbox.tsx
- dialog.tsx
- dropdown-menu.tsx
- form.tsx
- input.tsx
- label.tsx
- popover.tsx
- progress.tsx
- scroll-area.tsx
- select.tsx
- separator.tsx
- sheet.tsx
- skeleton.tsx
- slider.tsx
- sonner.tsx
- switch.tsx
- table.tsx
- tabs.tsx
- textarea.tsx
- toast.tsx
- toaster.tsx
- tooltip.tsx
- use-toast.ts

---

## Styling Files

### tailwind.config.ts
Copy from main project (contains all theme tokens, colors, animations)

### src/index.css
Copy from main project (contains CSS variables, gradients, utilities)

### src/App.css
Can be empty or copy from main project if needed
