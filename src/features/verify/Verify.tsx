import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { useUserStore } from "@/reducers/user";
import {VerificationForm} from '@/types/form';
import {VerifySchema} from '@/validation/form-validation';
import RoundedSubmitButton from "@/components/RoundedSubmitButton";
import PageTitle from "@/components/PageTitle";

const Verify = () => {
  const navigate = useNavigate();

  const verify = useUserStore.use.verify();
  const verifying = useUserStore.use.verifying();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<VerificationForm>({
    resolver: zodResolver(VerifySchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = (data: VerificationForm) => {
    verify(data, onVerifySuccess);
  };

  const onVerifySuccess = () => {
    navigate({to: '/profile'});
  };
    
  return (
    <div className='flex flex-col w-full h-full bg-white'>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <PageTitle text="E-mail Verification" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-start'>
            <label htmlFor='code'>Code:</label>
            <input id='code' type='text' 
              {...register('code')}
              className="p-2 border-2 border-gray-300 rounded-lg w-96" />
            {errors.code?.message && (
              <span className="text-red-500">{errors.code?.message}</span>
            )}
          </div>     
          <RoundedSubmitButton disabled={verifying} label={verifying ? 'Verifying' : 'Verify'} />
        </form>
      </div>
    </div>
  );
};

export default Verify;