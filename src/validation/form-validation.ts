import {z} from 'zod';

export const LoginSchema = z.object({
  username: z
    .string({required_error: 'Username is required'})
    .min(1, 'Username is required'),
  password: z
    .string({required_error: 'Password is required'})
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const SignupSchema = z
  .object({
    username: z
      .string({required_error: 'Username is required'})
      .min(1, 'Username is required'),
    email: z
      .string({required_error: 'Email is required'})
      .email('Invalid email'),
    password: z
      .string({required_error: 'Password is required'})
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    confirmPassword: z
      .string({required_error: 'Password confirmation is required'})
      .min(1, 'Password confirmation is required')
      .min(8, 'Password confirmation must be more than 8 characters')
      .max(32, 'Password confirmation must be less than 32 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Password and its confirmation doesn't match",
    path: ['confirmPassword'],
  });
