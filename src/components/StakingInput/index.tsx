import { STEP_DECIMALS } from '@/constants/programPubkey';
import Cleave from 'cleave.js/react';
import { clsx } from 'clsx';

type Props = {
  disabled?: boolean;
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void;
};
export const StakingInput = ({
  disabled,
  placeholder,
  value,
  onChange,
}: Props) => {
  return (
    <Cleave
      disabled={disabled}
      placeholder={placeholder}
      options={{
        numeral: true,
        numeralPositiveOnly: true,
        numeralDecimalScale: STEP_DECIMALS,
        numeralThousandsGroupStyle: 'thousand',
      }}
      value={value}
      onChange={(e) => onChange?.(e.target.rawValue)}
      className={clsx({
        'w-full bg-transparent focus:outline-none text-lg font-bold text-right font-mono':
          true,
        'placeholder-gray2': !disabled,
        'placeholder-white': disabled,
      })}
    />
  );
};
