import RoundButton from '@/components/RoundButton';
import { useUserStore } from '@/reducers/user';
import { Link } from '@tanstack/react-router';
import {useState} from 'react';

const Login = () => {
  const {login, loading} = useUserStore(store => store);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const onLoginPress = () => {
    login(username, password);
  };
    
  return (
    <div className='flex flex-col items-center'>
      <div className="flex flex-col justify-center w-full h-20">
        <h1 className='text-2xl font-extrabold text-center text-gray-700'>Login</h1>
      </div>
      <div className='flex flex-col items-start'>
        <label htmlFor='email'>Username</label>
        <input id='username' type='text' value={username} onChange={e => setUsername(e.target.value)} className="p-2 border-2 border-gray-300 rounded-lg w-96" />
        <label htmlFor='password'>Password</label>  
        <input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} className="p-2 border-2 border-gray-300 rounded-lg w-96" />
      </div>
      <RoundButton onPress={onLoginPress} disabled={loading} label="Login" />
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