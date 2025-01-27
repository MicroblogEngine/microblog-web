interface StepTitleProps {
  title: string;
} 

const StepTitle = ({ title }: StepTitleProps) => {
  return <div className="w-full mt-4 mb-4 text-2xl font-bold text-center">{title}</div>;
};

export default StepTitle;