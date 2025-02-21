import { cva } from "class-variance-authority";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { cn } from '@/helpers/tailwind';

interface RoundedButtonProps {
  title: string;
  className?: string;
  labelClassName?: string;
  icon?: IconDefinition;
  onClick: () => void;
  disabled?: boolean;
} 

const button = cva(
  "flex cursor-pointer flex-row items-center justify-center w-full text-white", 
  {
    variants: {
      disabled: {
        true: "bg-gray-600",
        false: "bg-gray-300",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

const RoundedButton = ({ title, className, icon, onClick, disabled = false, labelClassName}: RoundedButtonProps) => {
  return (
    <div 
      className={cn(button({disabled}), className)} 
      onClick={disabled ? undefined : onClick}>
      {icon && <FontAwesomeIcon icon={icon} width={32} height={32} color='white' className="hidden max-xl:flex" />}
      <span className={cn("hidden text-2xl font-bold xl:flex", labelClassName)}>{title}</span>
    </div>
  );
};

export default RoundedButton;