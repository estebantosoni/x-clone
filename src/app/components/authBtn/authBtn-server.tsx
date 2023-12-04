import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthBtn } from './authBtn-client'

// dependiendo si el usuario tiene sesion o no, se mostrará un botón o el otro
// se separa esta logica del client component

export async function AuthBtnServer() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  return <AuthBtn session={session} />
    
}
export { AuthBtn }

