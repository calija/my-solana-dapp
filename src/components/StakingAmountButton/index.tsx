type Props = {
  children: string;
  onClick: () => void;
};
export const StakingAmountButton = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-green1 text-green2 text-[10px] font-extrabold rounded-sm px-1 hover:bg-green2 hover:text-black transition-colors duration-300"
    >
      {children}
    </button>
  );
};
