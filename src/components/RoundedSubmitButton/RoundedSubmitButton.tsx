type RoundButtonProps = {
  disabled: boolean;
  label: string;
};

const RoundedSubmitButton = (props: RoundButtonProps) => {
  return (
    <input type="submit"
      disabled={props.disabled}
      className={`flex justify-center p-2 mt-2 text-lg font-normal text-white ${props.disabled ? 'bg-gray-300' : 'bg-gray-600'} rounded-lg h-19 border-1 w-96`} value={props.label}/>
  );
};

export default RoundedSubmitButton;
