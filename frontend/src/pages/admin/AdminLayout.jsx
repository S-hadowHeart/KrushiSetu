import { NavLink, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../api/admin.api';

const tabClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-field-700 text-white' : 'text-field-700 hover:bg-field-100'
  }`;

export default function AdminLayout() {
  const { data } = useQuery({ queryKey: ['admin', 'stats'], queryFn: adminApi.getStats });
  const stats = data?.stats;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-field-900">Admin</h1>
        <p className="text-sm text-field-500">Monitor and moderate everything happening on KrushiSetu.</p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          <StatCard label="Users" value={stats.users} />
          <StatCard label="Farmers" value={stats.farmers} />
          <StatCard label="Buyers" value={stats.buyers} />
          <StatCard label="Goods" value={stats.goods} />
          <StatCard label="Needs" value={stats.needs} />
          <StatCard label="Offers" value={stats.offers} />
          <StatCard label="Pending IDs" value={stats.pendingVerifications} />
        </div>
      )}

      <div className="flex flex-wrap gap-1 border-b border-field-100 pb-3">
        <NavLink to="/admin/users" className={tabClass}>
          Users
        </NavLink>
        <NavLink to="/admin/goods" className={tabClass}>
          Goods
        </NavLink>
        <NavLink to="/admin/needs" className={tabClass}>
          Needs
        </NavLink>
        <NavLink to="/admin/offers" className={tabClass}>
          Offers
        </NavLink>
        <NavLink to="/admin/messages" className={tabClass}>
          Messages
        </NavLink>
        <NavLink to="/admin/verifications" className={tabClass}>
          Verifications
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card p-3 text-center">
      <p className="font-display text-xl font-semibold text-field-900">{value}</p>
      <p className="text-xs text-field-500">{label}</p>
    </div>
  );
}
