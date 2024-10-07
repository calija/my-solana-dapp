import { Ellipsis, ExternalLink } from 'lucide-react';

type Props = {
  message: string;
  onClick: () => void;
};
export const ConfirmingTxToast = ({ message, onClick }: Props) => {
  return (
    <div className="flex flex-1 items-center gap-2.5">
      <Ellipsis size={25} color="blue" />
      <div className="flex flex-col flex-1 gap-2.5 text-white font-extrabold">
        {message}
        <span className="text-sm text-gray1">Confirmation is in progress</span>
        <button
          onClick={onClick}
          className="flex items-center gap-2 self-end rounded-sm text-green2 py-1.5 px-4 border border-gray1"
        >
          View on Solscan
          <ExternalLink size={16} color="#B2B2B2" />
        </button>
      </div>
    </div>
  );
};
