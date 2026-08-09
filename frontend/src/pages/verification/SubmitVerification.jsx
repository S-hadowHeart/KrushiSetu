import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ShieldCheck } from 'lucide-react';
import { verificationApi } from '../../api/verification.api';
import { useAuth } from '../../hooks/useAuth';
import { verificationSchema } from '../../utils/schemas';
import { extractErrorMessage, formatDate } from '../../utils/format';
import { ID_TYPES } from '../../utils/constants';
import { Select } from '../../components/common/Select';
import { Input } from '../../components/common/Input';
import { FileUploader } from '../../components/common/FileUploader';
import { Badge, statusTone } from '../../components/common/Badge';
import { Spinner } from '../../components/common/Spinner';

export default function SubmitVerification() {
  const { user, refreshProfile } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['verification', user?.id],
    queryFn: () => verificationApi.getForUser(user.id),
    enabled: !!user?.id,
    retry: false,
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(verificationSchema), defaultValues: { idType: '', idNumber: '' } });

  const attachments = watch('attachments') || [];

  const mutation = useMutation({
    mutationFn: (values) => verificationApi.submit(values),
    onSuccess: () => {
      toast.success('Verification submitted for review');
      reset();
      queryClient.invalidateQueries({ queryKey: ['verification', user?.id] });
      refreshProfile();
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const existing = data?.verification;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex items-center gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-field-700 text-white">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold text-field-900">Identity verification</h1>
          <p className="text-sm text-field-500">Verified accounts earn more trust in the marketplace.</p>
        </div>
      </div>

      {isLoading && <Spinner className="h-5 w-5 text-field-500" />}

      {existing && (
        <div className="card flex items-center justify-between p-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-field-400">Latest submission</p>
            <p className="font-medium text-field-800">
              {existing.idType} · {formatDate(existing.createdAt)}
            </p>
          </div>
          <Badge tone={statusTone(existing.status)}>{existing.status}</Badge>
        </div>
      )}

      {(!existing || existing.status === 'REJECTED') && (
        <form className="card space-y-4 p-8" onSubmit={handleSubmit((v) => mutation.mutate(v))} noValidate>
          <Select
            label="ID type"
            placeholder="Select an ID type"
            options={ID_TYPES.map((t) => ({ value: t, label: t.replaceAll('_', ' ') }))}
            error={errors.idType?.message}
            {...register('idType')}
          />
          <Input label="ID number" placeholder="Enter your ID number" error={errors.idNumber?.message} {...register('idNumber')} />
          <Controller
            control={control}
            name="attachments"
            render={({ field }) => (
              <FileUploader label="Attachments (ID photo/scan)" value={field.value || []} onChange={field.onChange} />
            )}
          />
          <button type="submit" className="btn-primary w-full" disabled={mutation.isPending}>
            {mutation.isPending && <Spinner className="h-4 w-4" />} Submit for review
          </button>
        </form>
      )}

      {existing?.status === 'PENDING' && (
        <p className="text-sm text-field-500">Your submission is awaiting admin review.</p>
      )}
    </div>
  );
}
