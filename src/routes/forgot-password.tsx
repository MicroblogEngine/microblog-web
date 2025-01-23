import { createFileRoute } from '@tanstack/react-router'

import ForgotPassword from '@/features/forgot_password/ForgotPassword'

export const Route = createFileRoute('/forgot-password')({
  component: ForgotPassword,
})
