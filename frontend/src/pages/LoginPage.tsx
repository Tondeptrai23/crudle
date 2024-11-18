import React from 'react'
import { LoginForm } from '@/components/auth/LoginForm'

export const LoginPage: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  )
}