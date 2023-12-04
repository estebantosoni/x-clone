"use client"

import { type Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { GitHubIcon } from "../icons"
import { useRouter } from "next/navigation"
import { Button } from '@nextui-org/button' 


export function AuthBtn({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient()
  // usado para refrescar la pagina luego de cerrar sesión
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback"
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header>
      {
        session === null
          ? (
            <button
                type="button"
                onClick={handleSignIn}
                className="text-white bg-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 mb-2"
            >
                <GitHubIcon />
                Sign in with Github
            </button>
            )
          : (
            <Button onClick={handleSignOut}>Sign Out</Button>
            )
      }
      </header> 
  )
}
