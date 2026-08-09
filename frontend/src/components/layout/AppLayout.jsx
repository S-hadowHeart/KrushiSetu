import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="page-shell flex-1 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
