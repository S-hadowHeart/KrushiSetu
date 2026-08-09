import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Handshake } from 'lucide-react';
import { needsApi } from '../../api/needs.api';
import { needSchema } from '../../utils/schemas';
import { extractErrorMessage } from '../../utils/format';
import { DELIVERY_MODES, PAYMENT_MODES } from '../../utils/constants';
import { Input } from '../../components/common/Input';
import { TextArea } from '../../components/common/TextArea';
import { TagInput } from '../../components/common/TagInput';
import { Select } from '../../components/common/Select';
import { Spinner } from '../../components/common/Spinner';

const emptyDefaults = {
  title: '',
  description: '',
  qtyNeeded: '',
  locations: [],
  priceMin: '',
  priceMax: '',
  deliveryMode: '',
  paymentMode: '',
  expiresAt: '',
};

export default function NeedForm() {
  const { publicId } = useParams();
  const isEdit = !!publicId;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['needs', publicId],
    queryFn: () => needsApi.get(publicId),
    enabled: isEdit,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(needSchema), defaultValues: emptyDefaults });

  useEffect(() => {
    if (data?.need) {
      const n = data.need;
      reset({
        title: n.title,
        description: n.description || '',
        qtyNeeded: n.qtyNeeded,
        locations: n.locations || [],
        priceMin: n.priceMin ?? '',
        priceMax: n.priceMax ?? '',
        deliveryMode: n.deliveryMode || '',
        paymentMode: n.paymentMode || '',
        expiresAt: n.expiresAt ? n.expiresAt.slice(0, 10) : '',
      });
    }
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: (values) => (isEdit ? needsApi.update(publicId, values) : needsApi.create(values)),
    onSuccess: (res) => {
      toast.success(isEdit ? 'Need updated' : 'Need posted');
      queryClient.invalidateQueries({ queryKey: ['needs'] });
      navigate(`/needs/${res.need.publicId}`);
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-field-700 text-white">
          <Handshake className="h-5 w-5" />
        </span>
        <h1 className="font-display text-2xl font-semibold text-field-900">
          {isEdit ? 'Edit need' : 'Post a new need'}
        </h1>
      </div>

      <form className="card space-y-5 p-8" onSubmit={handleSubmit((v) => mutation.mutate(v))} noValidate>
        <Input label="Title" placeholder="Need 200kg onions weekly" error={errors.title?.message} {...register('title')} />

        <Input type="number" step="any" label="Quantity needed" error={errors.qtyNeeded?.message} {...register('qtyNeeded')} />

        <Controller
          control={control}
          name="locations"
          render={({ field }) => (
            <TagInput
              label="Locations"
              placeholder="Type a location and press Enter"
              hint="Where should this be delivered or picked up from?"
              value={field.value}
              onChange={field.onChange}
              error={errors.locations?.message}
            />
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input type="number" step="any" label="Min price / unit (optional)" error={errors.priceMin?.message} {...register('priceMin')} />
          <Input type="number" step="any" label="Max price / unit (optional)" error={errors.priceMax?.message} {...register('priceMax')} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Delivery mode"
            placeholder="Select…"
            options={DELIVERY_MODES.map((m) => ({ value: m, label: m.replaceAll('_', ' ') }))}
            error={errors.deliveryMode?.message}
            {...register('deliveryMode')}
          />
          <Select
            label="Payment mode"
            placeholder="Select…"
            options={PAYMENT_MODES.map((m) => ({ value: m, label: m.replaceAll('_', ' ') }))}
            error={errors.paymentMode?.message}
            {...register('paymentMode')}
          />
        </div>

        <TextArea label="Description" placeholder="Any additional details…" error={errors.description?.message} {...register('description')} />

        <Input type="date" label="Expires on (optional)" error={errors.expiresAt?.message} {...register('expiresAt')} />

        <button type="submit" className="btn-primary w-full" disabled={mutation.isPending}>
          {mutation.isPending && <Spinner className="h-4 w-4" />} {isEdit ? 'Save changes' : 'Post need'}
        </button>
      </form>
    </div>
  );
}
