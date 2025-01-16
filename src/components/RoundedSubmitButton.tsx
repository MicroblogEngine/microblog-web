type RoundButtonProps = {
  disabled: boolean;
  label: string;
};

const RoundedSubmitButton = (props: RoundButtonProps) => {
  return (
    <input type="submit"
      className="flex justify-center p-2 mt-2 text-white bg-gray-600 rounded-lg h-19 border-1 w-96" value={props.label}/>
  );
};

export default RoundedSubmitButton;
