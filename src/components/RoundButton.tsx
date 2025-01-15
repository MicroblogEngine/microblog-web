type RoundButtonProps = {
  onPress: () => void;
  disabled: boolean;
  label: string;
};

const RoundButton = (props: RoundButtonProps) => {
  return (
    <div
      className="flex justify-center p-2 mt-2 bg-gray-600 rounded-lg h-19 border-1 w-96"
      onClick={props.disabled ? () => {} : props.onPress}>
      <span className="text-white">{props.label}</span>
    </div>
  );
};

export default RoundButton;
