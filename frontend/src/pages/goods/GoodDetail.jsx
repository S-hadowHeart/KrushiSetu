import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { MapPin, ShieldCheck, Pencil, Trash2, Truck, Wallet, ArrowLeft, MessagesSquare } from 'lucide-react';
import { goodsApi } from '../../api/goods.api';
import { offersApi } from '../../api/offers.api';
import { ratingsApi } from '../../api/ratings.api';
import { useAuth } from '../../hooks/useAuth';
import { offerSchema, ratingSchema } from '../../utils/schemas';
import { extractErrorMessage, formatCurrency, formatDate } from '../../utils/format';
import { fileUrl } from '../../utils/constants';
import { Input } from '../../components/common/Input';
import { TextArea } from '../../components/common/TextArea';
import { Spinner } from '../../components/common/Spinner';
import { RatingStars } from '../../components/common/RatingStars';

export default function GoodDetail() {
  const { publicId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [activeImage, setActiveImage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['goods', publicId],
    queryFn: () => goodsApi.get(publicId),
  });

  const deleteMutation = useMutation({
    mutationFn: () => goodsApi.remove(publicId),
    onSuccess: () => {
      toast.success('Listing deleted');
      queryClient.invalidateQueries({ queryKey: ['goods'] });
      navigate('/goods');
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

  const good = data?.good;
  if (!good) return null;

  const isOwner = user?.id === good.farmerId;
  const images = good.images?.length ? good.images : [null];

  return (
    <div className="space-y-8">
      <Link to="/goods" className="inline-flex items-center gap-1 text-sm font-medium text-field-600 hover:text-field-900">
        <ArrowLeft className="h-4 w-4" /> Back to goods
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-xl2 border border-field-100 bg-field-50">
            {images[activeImage] ? (
              <img
                src={fileUrl(images[activeImage])}
                alt={good.name}
                crossOrigin="anonymous"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full place-items-center text-4xl">🌾</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`h-14 w-14 overflow-hidden rounded-lg border-2 ${
                    idx === activeImage ? 'border-field-600' : 'border-transparent'
                  }`}
                >
                  {img && (
                    <img
                      src={fileUrl(img)}
                      alt=""
                      crossOrigin="anonymous"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-semibold text-field-900">{good.name}</h1>
              <p className="mt-1 flex items-center gap-1 text-sm text-field-500">
                <MapPin className="h-4 w-4" /> {good.locations?.join(', ')}
              </p>
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <Link to={`/goods/${good.publicId}/edit`} className="btn-secondary !px-3 !py-2">
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  className="btn-danger !px-3 !py-2"
                  onClick={() => {
                    if (confirm('Delete this listing? This cannot be undone.')) deleteMutation.mutate();
                  }}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <p className="font-display text-2xl font-semibold text-field-700">
            {formatCurrency(good.priceMin)} – {formatCurrency(good.priceMax)}
          </p>
          <p className="text-sm text-field-500">
            Quantity available: {good.minQty} – {good.maxQty} units
          </p>

          {good.description && <p className="text-field-700">{good.description}</p>}

          <div className="flex flex-wrap gap-4 text-sm text-field-600">
            {good.deliveryModes?.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4" /> {good.deliveryModes.join(', ')}
              </span>
            )}
            {good.paymentModes?.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Wallet className="h-4 w-4" /> {good.paymentModes.join(', ')}
              </span>
            )}
          </div>

          {good.availableFrom && (
            <p className="text-xs text-field-400">Available from {formatDate(good.availableFrom)}</p>
          )}

          <div className="card flex items-center justify-between p-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-field-400">Listed by</p>
              <Link to={isOwner ? '/profile' : '#'} className="font-display text-base font-semibold text-field-900">
                {good.farmer?.name}
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {good.farmer?.verified && (
                <span className="flex items-center gap-1 text-sm font-medium text-field-600">
                  <ShieldCheck className="h-4 w-4" /> Verified
                </span>
              )}
              {!isOwner && isAuthenticated && (
                <Link to={`/messages/${good.farmerId}`} className="btn-secondary !px-3 !py-2">
                  <MessagesSquare className="h-4 w-4" /> Message
                </Link>
              )}
            </div>
          </div>

          {!isOwner && isAuthenticated && <MakeOfferForm goodId={good.publicId} />}
          {!isOwner && !isAuthenticated && (
            <p className="rounded-lg bg-field-50 p-4 text-sm text-field-600">
              <Link to="/login" className="font-semibold text-field-800 underline">
                Log in
              </Link>{' '}
              to make an offer on this listing.
            </p>
          )}

          {!isOwner && isAuthenticated && (
            <RateFarmerForm targetId={good.farmerId} goodId={good.id} />
          )}
        </div>
      </div>
    </div>
  );
}

function MakeOfferForm({ goodId }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(offerSchema) });

  const mutation = useMutation({
    mutationFn: (payload) => offersApi.createForGood(goodId, payload),
    onSuccess: () => {
      toast.success('Offer sent!');
      reset();
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  return (
    <form className="card space-y-3 p-5" onSubmit={handleSubmit((v) => mutation.mutate(v))}>
      <h3 className="font-display text-base font-semibold text-field-900">Make an offer</h3>
      <div className="grid grid-cols-2 gap-3">
        <Input type="number" step="any" label="Quantity" placeholder="20" error={errors.qty?.message} {...register('qty')} />
        <Input type="number" step="any" label="Price / unit" placeholder="30" error={errors.price?.message} {...register('price')} />
      </div>
      <TextArea label="Message (optional)" placeholder="I'm interested in…" error={errors.message?.message} {...register('message')} />
      <button type="submit" className="btn-primary w-full" disabled={mutation.isPending}>
        {mutation.isPending && <Spinner className="h-4 w-4" />} Send offer
      </button>
    </form>
  );
}

function RateFarmerForm({ targetId, goodId }) {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');

  const mutation = useMutation({
    mutationFn: () => {
      const payload = ratingSchema.parse({ targetId, type: 'user', score, comment: comment || undefined, goodId });
      return ratingsApi.create(payload);
    },
    onSuccess: () => {
      toast.success('Thanks for the review!');
      setScore(0);
      setComment('');
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  return (
    <div className="card space-y-3 p-5">
      <h3 className="font-display text-base font-semibold text-field-900">Rate this farmer</h3>
      <RatingStars value={score} onChange={setScore} size={24} />
      <TextArea
        placeholder="Optional comment about your experience"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="btn-secondary w-full"
        disabled={!score || mutation.isPending}
        onClick={() => mutation.mutate()}
      >
        {mutation.isPending && <Spinner className="h-4 w-4" />} Submit rating
      </button>
    </div>
  );
}
