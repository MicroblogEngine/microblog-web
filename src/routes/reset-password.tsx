import { createFileRoute } from '@tanstack/react-router'

import ResetPassword from '@/features/reset_password/ResetPassword'

export const Route = createFileRoute('/reset-password')({
  component: ResetPassword,
})
