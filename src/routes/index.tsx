import { createFileRoute, redirect } from '@tanstack/react-router'

import Home from '@/features/home/Home'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: Home,
})
