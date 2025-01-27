import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RoundedButtonProps {
  title: string;
  className?: string;
  labelClassName?: string;
  icon?: IconDefinition;
  onClick: () => void;
  disabled?: boolean;
} 

const RoundedButton = ({ title, className, icon, onClick, disabled = false, labelClassName}: RoundedButtonProps) => {
  return (
    <div 
      className={`flex flex-row items-center justify-center w-full text-white ${className} ${disabled ? 'bg-gray-300' : 'bg-gray-600'}`} 
      onClick={disabled ? undefined : onClick}>
      {icon && <FontAwesomeIcon icon={icon} width={32} height={32} color='white' className="hidden max-xl:flex" />}
      <span className={`hidden text-2xl font-bold xl:flex ${labelClassName}`}>{title}</span>
    </div>
  );
};

export default RoundedButton;