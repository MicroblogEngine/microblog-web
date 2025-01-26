import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RoundedButtonProps {
  title: string;
  icon: IconDefinition;
  onClick: () => void;
} 

const RoundedButton = ({ title, icon, onClick }: RoundedButtonProps) => {
  return (
    <div 
      className="flex flex-row items-center justify-center w-full text-white bg-black rounded-full cursor-pointer max-xl:w-14 max-xl:h-14 h-14" 
      onClick={onClick}>
      <FontAwesomeIcon icon={icon} width={32} height={32} color='white' className="hidden max-xl:flex" />
      <span className="hidden text-2xl font-bold xl:flex">{title}</span>
    </div>
  );
};

export default RoundedButton;