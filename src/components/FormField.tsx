

import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  tabIndex?: number;
}

const FormField = ({ label, name, type, tabIndex }: FormFieldProps) => {
  const { control, formState: { errors } } = useFormContext();

  return <>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      type={type}
      tabIndex={tabIndex}
      {...control.register(name)}
      className="p-2 border-2 border-gray-300 rounded-lg w-96"
    />
    {errors[name] && (
      <span className="text-red-500">{errors[name].message?.toString()}</span>
    )}  
  </>;
};

export default FormField;
