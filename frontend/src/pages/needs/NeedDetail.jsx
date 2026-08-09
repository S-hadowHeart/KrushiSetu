import { useNavigate, Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { MapPin, ShieldCheck, Pencil, Trash2, Clock, ArrowLeft, MessagesSquare } from 'lucide-react';
import { needsApi } from '../../api/needs.api';
import { offersApi } from '../../api/offers.api';
import { useAuth } from '../../hooks/useAuth';
import { offerSchema } from '../../utils/schemas';
import { extractErrorMessage, formatCurrency, formatDate } from '../../utils/format';
import { Input } from '../../components/common/Input';
import { TextArea } from '../../components/common/TextArea';
import { Spinner } from '../../components/common/Spinner';

export default function NeedDetail() {
  const { publicId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['needs', publicId],
    queryFn: () => needsApi.get(publicId),
  });

  const deleteMutation = useMutation({
    mutationFn: () => needsApi.remove(publicId),
    onSuccess: () => {
      toast.success('Need deleted');
      queryClient.invalidateQueries({ queryKey: ['needs'] });
      navigate('/needs');
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="h-6 w-6 text-field-500" />
      </div>
    );
  }

  const need = data?.need;
  if (!need) return null;
  const isOwner = user?.id === need.buyerId;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link to="/needs" className="inline-flex items-center gap-1 text-sm font-medium text-field-600 hover:text-field-900">
        <ArrowLeft className="h-4 w-4" /> Back to needs
      </Link>

      <div className="card space-y-4 p-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-field-900">{need.title}</h1>
            {need.locations?.length > 0 && (
              <p className="mt-1 flex items-center gap-1 text-sm text-field-500">
                <MapPin className="h-4 w-4" /> {need.locations.join(', ')}
              </p>
            )}
          </div>
          {isOwner && (
            <div className="flex gap-2">
              <Link to={`/needs/${need.publicId}/edit`} className="btn-secondary !px-3 !py-2">
                <Pencil className="h-4 w-4" />
              </Link>
              <button
                className="btn-danger !px-3 !py-2"
                onClick={() => {
                  if (confirm('Delete this need? This cannot be undone.')) deleteMutation.mutate();
                }}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <p className="text-field-700">Quantity needed: {need.qtyNeeded} units</p>
        {(need.priceMin || need.priceMax) && (
          <p className="font-display text-xl font-semibold text-field-700">
            {formatCurrency(need.priceMin)} – {formatCurrency(need.priceMax)}
          </p>
        )}
        {need.description && <p className="text-field-700">{need.description}</p>}
        {need.expiresAt && (
          <p className="flex items-center gap-1 text-xs text-field-400">
            <Clock className="h-3.5 w-3.5" /> Expires {formatDate(need.expiresAt)}
          </p>
        )}

        <div className="flex items-center justify-between rounded-lg bg-field-50 p-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-field-400">Posted by</p>
            <p className="font-display text-base font-semibold text-field-900">{need.buyer?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            {need.buyer?.verified && (
              <span className="flex items-center gap-1 text-sm font-medium text-field-600">
                <ShieldCheck className="h-4 w-4" /> Verified
              </span>
            )}
            {!isOwner && isAuthenticated && (
              <Link to={`/messages/${need.buyerId}`} className="btn-secondary !px-3 !py-2">
                <MessagesSquare className="h-4 w-4" /> Message
              </Link>
            )}
          </div>
        </div>
      </div>

      {!isOwner && isAuthenticated && <MakeOfferForm needId={need.publicId} />}
      {!isOwner && !isAuthenticated && (
        <p className="rounded-lg bg-field-50 p-4 text-sm text-field-600">
          <Link to="/login" className="font-semibold text-field-800 underline">
            Log in
          </Link>{' '}
          to respond to this need with an offer.
        </p>
      )}
    </div>
  );
}

function MakeOfferForm({ needId }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(offerSchema) });

  const mutation = useMutation({
    mutationFn: (payload) => offersApi.createForNeed(needId, payload),
    onSuccess: () => {
      toast.success('Offer sent!');
      reset();
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  return (
    <form className="card space-y-3 p-5" onSubmit={handleSubmit((v) => mutation.mutate(v))}>
      <h3 className="font-display text-base font-semibold text-field-900">Offer to fulfil this need</h3>
      <div className="grid grid-cols-2 gap-3">
        <Input type="number" step="any" label="Quantity" placeholder="20" error={errors.qty?.message} {...register('qty')} />
        <Input type="number" step="any" label="Price / unit" placeholder="30" error={errors.price?.message} {...register('price')} />
      </div>
      <TextArea label="Message (optional)" placeholder="I can supply this…" error={errors.message?.message} {...register('message')} />
      <button type="submit" className="btn-primary w-full" disabled={mutation.isPending}>
        {mutation.isPending && <Spinner className="h-4 w-4" />} Send offer
      </button>
    </form>
  );
}
