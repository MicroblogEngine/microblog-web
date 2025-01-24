import { createLazyFileRoute } from '@tanstack/react-router'

import Home from '@/features/home/Home'

export const Route = createLazyFileRoute('/')({
  component: Home,
})
