import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  src: string;
  name?: string;
  size?: 'small' | 'large';
};
export const WalletIcon = ({ src, name, size = 'small' }: Props) => {
  return (
    <Image
      src={src}
      alt={`${name} icon`}
      className={clsx({
        'size-5': size === 'small',
        'size-6': size === 'large',
      })}
    />
  );
};
