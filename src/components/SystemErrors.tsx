import { useTranslation } from "react-i18next";

type SystemErrorsProps = {
  errors?: string[]
}

export const SystemErrors = ({ errors }: SystemErrorsProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center mt-5 mb-5">
      {errors?.map((error) => (
        <span className="text-red-500" key={error}>{t(error)}</span>
      ))}
    </div>
  );
};
