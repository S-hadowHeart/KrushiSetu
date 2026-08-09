import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Sprout } from 'lucide-react';
import { goodsApi } from '../../api/goods.api';
import { goodSchema } from '../../utils/schemas';
import { extractErrorMessage } from '../../utils/format';
import { DELIVERY_MODES, PAYMENT_MODES } from '../../utils/constants';
import { Input } from '../../components/common/Input';
import { TextArea } from '../../components/common/TextArea';
import { TagInput } from '../../components/common/TagInput';
import { CheckboxGroup } from '../../components/common/CheckboxGroup';
import { FileUploader } from '../../components/common/FileUploader';
import { Spinner } from '../../components/common/Spinner';

const emptyDefaults = {
  name: '',
  minQty: '',
  maxQty: '',
  priceMin: '',
  priceMax: '',
  locations: [],
  deliveryModes: [],
  paymentModes: [],
  description: '',
  availableFrom: '',
  images: [],
};

export default function GoodForm() {
  const { publicId } = useParams();
  const isEdit = !!publicId;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['goods', publicId],
    queryFn: () => goodsApi.get(publicId),
    enabled: isEdit,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(goodSchema), defaultValues: emptyDefaults });

  useEffect(() => {
    if (data?.good) {
      const g = data.good;
      reset({
        name: g.name,
        minQty: g.minQty,
        maxQty: g.maxQty,
        priceMin: g.priceMin,
        priceMax: g.priceMax,
        locations: g.locations || [],
        deliveryModes: g.deliveryModes || [],
        paymentModes: g.paymentModes || [],
        description: g.description || '',
        availableFrom: g.availableFrom ? g.availableFrom.slice(0, 10) : '',
        images: g.images || [],
      });
    }
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: (values) => (isEdit ? goodsApi.update(publicId, values) : goodsApi.create(values)),
    onSuccess: (res) => {
      toast.success(isEdit ? 'Listing updated' : 'Listing created');
      queryClient.invalidateQueries({ queryKey: ['goods'] });
      navigate(`/goods/${res.good.publicId}`);
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-field-700 text-white">
          <Sprout className="h-5 w-5" />
        </span>
        <h1 className="font-display text-2xl font-semibold text-field-900">
          {isEdit ? 'Edit listing' : 'New goods listing'}
        </h1>
      </div>

      <form className="card space-y-5 p-8" onSubmit={handleSubmit((v) => mutation.mutate(v))} noValidate>
        <Input label="Name" placeholder="Alphonso mangoes" error={errors.name?.message} {...register('name')} />

        <div className="grid grid-cols-2 gap-4">
          <Input type="number" step="any" label="Min quantity" error={errors.minQty?.message} {...register('minQty')} />
          <Input type="number" step="any" label="Max quantity" error={errors.maxQty?.message} {...register('maxQty')} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input type="number" step="any" label="Min price / unit" error={errors.priceMin?.message} {...register('priceMin')} />
          <Input type="number" step="any" label="Max price / unit" error={errors.priceMax?.message} {...register('priceMax')} />
        </div>

        <Controller
          control={control}
          name="locations"
          render={({ field }) => (
            <TagInput
              label="Locations"
              placeholder="Type a location and press Enter"
              hint="Add every location where this produce is available."
              value={field.value}
              onChange={field.onChange}
              error={errors.locations?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="deliveryModes"
          render={({ field }) => (
            <CheckboxGroup label="Delivery modes" options={DELIVERY_MODES} value={field.value} onChange={field.onChange} />
          )}
        />

        <Controller
          control={control}
          name="paymentModes"
          render={({ field }) => (
            <CheckboxGroup label="Payment modes" options={PAYMENT_MODES} value={field.value} onChange={field.onChange} />
          )}
        />

        <TextArea label="Description" placeholder="Freshly harvested, grade A…" error={errors.description?.message} {...register('description')} />

        <Input type="date" label="Available from" error={errors.availableFrom?.message} {...register('availableFrom')} />

        <Controller
          control={control}
          name="images"
          render={({ field }) => <FileUploader label="Photos" value={field.value} onChange={field.onChange} />}
        />

        <button type="submit" className="btn-primary w-full" disabled={mutation.isPending}>
          {mutation.isPending && <Spinner className="h-4 w-4" />} {isEdit ? 'Save changes' : 'Publish listing'}
        </button>
      </form>
    </div>
  );
}
