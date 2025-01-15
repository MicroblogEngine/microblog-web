import RoundButton from "@/components/RoundButton";
import { useUserStore } from "@/reducers/user";
import { useState } from "react";

const Signup = () => {
  const {signup, loading} = useUserStore(store => store);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSignupPress = () => {
    signup();
  };
    
  return (
    <div className='flex flex-col w-full h-full bg-white'>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <div className="flex flex-col items-center justify-center w-full h-20">
          <h1 className='text-2xl font-extrabold text-center text-gray-700'>Signup</h1>
        </div>
        <div className='flex flex-col items-start'>
          <label htmlFor='email'>Email:</label>
          <input id='email' type='email' 
            onChange={e => setEmail(e.target.value)}
            value={email} 
            className="p-2 border-2 border-gray-300 rounded-lg w-96" />
          <label htmlFor='email'>Username:</label>
          <input id='username' type='username' 
            onChange={e => setUsername(e.target.value)}
            value={username} 
            className="p-2 border-2 border-gray-300 rounded-lg w-96" />
          <label htmlFor='password'>Password:</label>  
          <input id='password' type='password' 
            onChange={e => setPassword(e.target.value)}
            value={password} 
            className="p-2 border-2 border-gray-300 rounded-lg w-96" />
          <label htmlFor='confirmPassword'>Confirm Password:</label>  
          <input 
            id='confirmPassword' 
            type='confirmPassword'           
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword} 
            className="p-2 border-2 border-gray-300 rounded-lg w-96" />
        </div>     
        <RoundButton onPress={onSignupPress} disabled={loading} label="Signup" />
      </div>
    </div>
  );
};

export default Signup;