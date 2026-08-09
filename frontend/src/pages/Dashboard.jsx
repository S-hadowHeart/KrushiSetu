import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Sprout, Handshake, Inbox, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { offersApi } from '../api/offers.api';
import { ROLES } from '../utils/constants';
import { Badge, statusTone } from '../components/common/Badge';

export default function Dashboard() {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ['offers', 'me'],
    queryFn: offersApi.listMine,
  });

  const pendingOffers = (data?.offers || []).filter((o) => o.status === 'PENDING');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-field-900">Welcome back, {user?.name}</h1>
        <p className="mt-1 flex items-center gap-2 text-field-500">
          Signed in as <Badge tone="neutral">{user?.role}</Badge>
          {user?.verified ? (
            <Badge tone="success">Verified</Badge>
          ) : (
            <Badge tone="warning">Not verified</Badge>
          )}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {user?.role === ROLES.FARMER && (
          <DashboardCard
            icon={Sprout}
            title="List your produce"
            description="Publish a new goods listing so buyers can find and offer on it."
            to="/goods/new"
            cta="Create listing"
          />
        )}
        {user?.role === ROLES.BUYER && (
          <DashboardCard
            icon={Handshake}
            title="Post a need"
            description="Tell farmers what you're looking for and let offers come to you."
            to="/needs/new"
            cta="Post a need"
          />
        )}
        <DashboardCard
          icon={Inbox}
          title="Offers received"
          description={
            pendingOffers.length
              ? `${pendingOffers.length} offer${pendingOffers.length > 1 ? 's' : ''} waiting for your response.`
              : 'No pending offers right now.'
          }
          to="/offers"
          cta="Review offers"
        />
        {!user?.verified && (
          <DashboardCard
            icon={ShieldCheck}
            title="Get verified"
            description="Submit an ID to earn a verified badge and build trust with trading partners."
            to="/verification"
            cta="Submit verification"
          />
        )}
      </div>
    </div>
  );
}

function DashboardCard({ icon: Icon, title, description, to, cta }) {
  return (
    <div className="card flex flex-col gap-3 p-6">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-field-50 text-field-600">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="font-display text-base font-semibold text-field-900">{title}</h3>
      <p className="flex-1 text-sm text-field-500">{description}</p>
      <Link to={to} className="inline-flex items-center gap-1 text-sm font-semibold text-field-700 hover:text-field-900">
        {cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
