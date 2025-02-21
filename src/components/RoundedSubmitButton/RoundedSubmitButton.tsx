import { cva } from "class-variance-authority";

type RoundButtonProps = {
  disabled: boolean;
  label: string;
};

const button = cva(
  "flex justify-center p-2 mt-2 text-lg font-normal text-white rounded-lg h-19 border-1 w-96",
  {
    variants: {
      disabled: {
        true: "bg-gray-300",
        false: "bg-gray-600",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

const RoundedSubmitButton = ({disabled, label}: RoundButtonProps) => {
  return (
    <input type="submit"
      disabled={disabled}
      className={button({disabled})} value={label}/>
  );
};

export default RoundedSubmitButton;
