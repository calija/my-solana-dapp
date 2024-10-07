import Image from 'next/image';

type Props = {
  src: string;
  name?: string;
};
export const WalletIcon = ({ src, name }: Props) => {
  return <Image width={20} height={20} src={src} alt={`${name} icon`} />;
};
