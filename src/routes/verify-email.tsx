import { createFileRoute } from '@tanstack/react-router'

import Verify from '@/features/verify/Verify'

export const Route = createFileRoute('/verify-email')({
  component: Verify,
})
