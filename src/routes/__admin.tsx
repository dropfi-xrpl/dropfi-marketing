import { TooltipProvider } from '@/components/ui/tooltip';
import { getSession } from '@/server/users/session';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/__admin')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const session = await getSession();
    if (!session) throw redirect({ to: '/login' });
  },
});

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
    </div>
  );
}
