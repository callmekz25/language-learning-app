import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/hooks/useToast';

type MutationToastOptions = {
  success?: string;
  error?: string;
  invalidateKeys?: (string | unknown[])[];
};

export function useMutationWithToast<TData = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: MutationToastOptions,
): UseMutationResult<TData, unknown, TVariables> {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation<TData, unknown, TVariables>({
    mutationFn,
    onSuccess: () => {
      toast(options?.success ?? 'Success');

      options?.invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: Array.isArray(key) ? key : [key] });
      });
    },
    onError: () => toast(options?.error ?? 'Failed'),
  });
}
