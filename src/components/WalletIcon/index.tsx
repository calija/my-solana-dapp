import clsx from "clsx";

type Props = {
  src?: string;
  name?: string;
  size?: "small" | "large";
};
export const WalletIcon = ({ src, name, size = "small" }: Props) => {
  return (
    <img
      src={src}
      alt={`${name} icon`}
      className={clsx({
        "size-5": size === "small",
        "size-6": size === "large",
      })}
    />
  );
};
