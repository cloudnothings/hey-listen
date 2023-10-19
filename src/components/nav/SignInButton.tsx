"use client"

import { signIn } from "next-auth/react"
import { Button } from "../ui/button"

const SignInButton = () => {
  return (
    <Button onClick={() => void signIn('spotify')}>Sign In</Button>
  )
}

export default SignInButton
