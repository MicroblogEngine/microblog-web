import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { useUserStore } from "@/reducers/user";
import {VerificationForm} from '@ararog/microblog-types';
import {VerifyFormSchema} from '@ararog/microblog-validation';
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
    resolver: zodResolver(VerifyFormSchema),
    defaultValues: {
      token: '',
    },
  });

  const onSubmit = (data: VerificationForm) => {
    verify(data, onVerifySuccess);
  };

  const onVerifySuccess = () => {
    navigate({to: '/profile'});
  };
    
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <PageTitle text="E-mail Verification" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-start'>
          <label htmlFor='token'>Code:</label>
          <input id='token' type='text' 
            {...register('token')}
            className="p-2 border-2 border-gray-300 rounded-lg w-96" />
          {errors.token?.message && (
            <span className="text-red-500">{errors.token?.message}</span>
          )}
        </div>     
        <RoundedSubmitButton disabled={verifying} label={verifying ? 'Verifying' : 'Verify'} />
      </form>
    </div>
  );
};

export default Verify;