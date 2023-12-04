"use server"

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

// recibe los datos del formulario
// esta forma de manipular datos viene por los server actions
  
export const addPost = async (formData: FormData) => {

  const content = formData.get("content")
    
  if (content === null) {
    return
  }
  const supabase = createServerActionClient({ cookies })
    
  // antes de enviar los datos a supabase hay que verificar que el usuario tenga permisos
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) {
    return
  }

  await supabase.from("posts").insert({ content, user_id: user.id })

  // permite el re-renderizado de la pagina
  // en el cliente se modifica unicamente lo que tiene cambios
  // se reemplaza lo antiguo con lo nuevo
  revalidatePath("/")
}

export const deletePost = async (id: string) => {
  const supabase = createServerActionClient({ cookies })
  
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) {
    return
  }

  await supabase.from("posts").delete().eq('id', id)

  revalidatePath("/")
}
