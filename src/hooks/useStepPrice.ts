import { useQuery } from '@tanstack/react-query';

const fetchStepPrice = async () => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=step-finance&vs_currencies=usd'
  );
  if (!response.ok) {
    throw new Error('Error while fetching STEP price');
  }
  const data = await response.json();
  return data['step-finance'].usd as number;
};

export const useStepPrice = () => {
  return useQuery({
    queryKey: ['stepPrice'],
    queryFn: fetchStepPrice,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60,
  });
};
