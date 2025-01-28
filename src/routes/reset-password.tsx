import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';

import ResetPassword from '@/features/reset_password/ResetPassword'

const searchSchema = z.object({
  userId: z.string().uuid(),
  token: z.string().min(8).max(8),
})


export const Route = createFileRoute('/reset-password')({
  component: ResetPassword,
  validateSearch: searchSchema,
})
