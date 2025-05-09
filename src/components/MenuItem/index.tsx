import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface MenuItemProps {
  title: string;
  icon: IconDefinition;
  onClick?: () => void;
} 

const MenuItem = ({ title, icon, onClick }: MenuItemProps) => {
  return (
    <div className="flex flex-row items-center p-2 cursor-pointer max-md:justify-center" onClick={onClick}>
      <div className="flex justify-center w-10">
        <FontAwesomeIcon icon={icon} size='xl' />
      </div> 
      <span className="text-xl font-bold max-xl:hidden">{title}</span>
    </div>
  );
};

export default MenuItem;