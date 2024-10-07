import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  isActive?: boolean;
  onClick: () => void;
  children: string;
  Icon?: ReactNode;
};
export const StakeCardTabButton = ({
  onClick,
  isActive,
  children,
  Icon,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx({
        'flex items-center justify-center w-[150px] h-[45px] gap-4 rounded-t-lg text-sm font-bold transition-colors duration-300 hover:text-green2':
          true,
        'bg-card text-green2': isActive,
        'bg-[rgb(10,10,10)] text-gray2': !isActive,
      })}
    >
      {Icon && Icon}
      {children}
    </button>
  );
};
