import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface MenuItemProps {
  title: string;
  icon: IconDefinition;
  onClick?: () => void;
} 

const MenuItem = ({ title, icon, onClick }: MenuItemProps) => {
  return (
    <div className="flex-row items-center p-2 cursor-pointer max-md:justify-center" onClick={onClick}>
      <FontAwesomeIcon icon={icon} width={32} height={32} />
      <span className="text-2xl font-bold max-xl:hidden">{title}</span>
    </div>
  );
};

export default MenuItem;