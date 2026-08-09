import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Sprout, Menu, X, LogOut, ShieldCheck, MessageCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { messagesApi } from '../../api/messages.api';
import { ROLES } from '../../utils/constants';

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-field-700 text-white' : 'text-field-700 hover:bg-field-100'
  }`;

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: conversationsData } = useQuery({
    queryKey: ['messages', 'conversations'],
    queryFn: messagesApi.listConversations,
    enabled: isAuthenticated,
    refetchInterval: 20_000,
  });
  const unreadTotal = (conversationsData?.conversations || []).reduce((sum, c) => sum + c.unreadCount, 0);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  const links = [
    { to: '/goods', label: 'Goods' },
    { to: '/needs', label: 'Needs' },
  ];
  if (isAuthenticated) {
    links.push({ to: '/dashboard', label: 'Dashboard' });
    links.push({ to: '/offers', label: 'Offers' });
    links.push({ to: '/verification', label: 'Verification' });
  }
  if (user?.role === ROLES.ADMIN) {
    links.push({ to: '/admin', label: 'Admin' });
  }

  return (
    <header className="sticky top-0 z-30 border-b border-field-100 bg-paper/90 backdrop-blur">
      <nav className="page-shell flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-field-800">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-field-700 text-white">
            <Sprout className="h-5 w-5" />
          </span>
          KrushiSetu
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <>
              <NavLink to="/messages" className={linkClass}>
                <span className="relative flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4" /> Messages
                  {unreadTotal > 0 && (
                    <span className="absolute -right-3 -top-2 grid h-4 w-4 place-items-center rounded-full bg-mustard-500 text-[10px] font-bold text-white">
                      {unreadTotal > 9 ? '9+' : unreadTotal}
                    </span>
                  )}
                </span>
              </NavLink>
              <NavLink to="/profile" className={linkClass}>
                <span className="flex items-center gap-1.5">
                  {user?.name}
                  {user?.verified && <ShieldCheck className="h-4 w-4 text-field-600" />}
                </span>
              </NavLink>
              <button onClick={handleLogout} className="btn-secondary !px-3 !py-2">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn-secondary !px-4 !py-2">
                Log in
              </NavLink>
              <NavLink to="/register" className="btn-primary !px-4 !py-2">
                Get started
              </NavLink>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="page-shell flex flex-col gap-1 border-t border-field-100 py-3 md:hidden">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <NavLink to="/messages" className={linkClass} onClick={() => setOpen(false)}>
                Messages {unreadTotal > 0 && `(${unreadTotal})`}
              </NavLink>
              <NavLink to="/profile" className={linkClass} onClick={() => setOpen(false)}>
                Profile
              </NavLink>
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="btn-secondary mt-1 w-full justify-start"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>
                Log in
              </NavLink>
              <NavLink to="/register" className={linkClass} onClick={() => setOpen(false)}>
                Get started
              </NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
}
