import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { useUserStore } from '@/reducers/user';
import { LoginForm } from '@/types/form';
import { LoginSchema } from '@/validation/form-validation';
import RoundedSubmitButton from '@/components/RoundedSubmitButton';

const Login = () => {
  const navigate = useNavigate();
    
  const {login, loading} = useUserStore(store => store);
  
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  
  const onSubmit = (data: LoginForm) => {
    login(data.username, data.password, onLoginSuccess);
  };

  const onLoginSuccess = () => {
    navigate({to:'/'});
  };

  return (
    <div className='flex flex-col items-center'>
      <div className="flex flex-col justify-center w-full h-20">
        <h1 className='text-2xl font-extrabold text-center text-gray-700'>Login</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-start'>
          <label htmlFor='email'>Username</label>
          <input id='username' type='text' {...register('username')} className="p-2 border-2 border-gray-300 rounded-lg w-96" />
          {errors.username?.message && (
              <span className="text-red-500">{errors.username?.message}</span>
            )}

          <label htmlFor='password'>Password</label>  
          <input id='password' type='password' {...register('password')} className="p-2 border-2 border-gray-300 rounded-lg w-96" />
          {errors.password?.message && (
              <span className="text-red-500">{errors.password?.message}</span>
            )}
        </div>
        <RoundedSubmitButton disabled={loading} label="Login" />
      </form>
      <div>
        <span className="mt-2 h-15">
          Don't have an account?{' '}
          <Link className="font-bold text-gray-800" to='/signup'>Signup</Link>{' '}
          here.
        </span>
      </div>         
    </div>
  );
};

export default Login;