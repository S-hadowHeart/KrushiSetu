import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Handshake, ShieldCheck, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const FEATURES = [
  {
    icon: Sprout,
    title: 'List what you grow',
    description: 'Farmers publish goods with quantity ranges, price bands, and delivery options in minutes.',
  },
  {
    icon: Handshake,
    title: 'Post what you need',
    description: 'Buyers, hotels, and NGOs broadcast requirements so nearby farmers can respond directly.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified identities',
    description: 'ID verification and admin moderation keep the marketplace trustworthy for everyone.',
  },
  {
    icon: Star,
    title: 'Ratings that matter',
    description: 'Every completed trade builds a public reputation for farmers and buyers alike.',
  },
];

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-20">
      <section className="grid items-center gap-10 py-8 lg:grid-cols-2 lg:py-16">
        <div>
          <span className="chip mb-4">Direct-to-market trade</span>
          <h1 className="font-display text-4xl font-semibold leading-tight text-field-900 sm:text-5xl">
            Where the harvest
            <br />
            meets the buyer.
          </h1>
          <p className="mt-5 max-w-md text-field-600">
            KrushiSetu cuts out the middle layer between farmers and the people who need their produce —
            hotels, NGOs, retailers, and households — with transparent listings, offers, and ratings.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {isAuthenticated ? (
              <Link to="/goods" className="btn-primary">
                Browse the marketplace <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary">
                  Join KrushiSetu <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/goods" className="btn-secondary">
                  Browse goods
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="card grid grid-cols-2 gap-4 p-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-field-100 bg-field-50/50 p-4">
              <f.icon className="h-5 w-5 text-field-600" />
              <h3 className="mt-2 font-display text-sm font-semibold text-field-900">{f.title}</h3>
              <p className="mt-1 text-xs text-field-500">{f.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
