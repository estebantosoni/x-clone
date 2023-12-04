// creamos un cliente de supabase para un componente de tipo servidor
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// al estar del lado del servidor necesitamos las cookies para que supabase sepa si el usuario esta logueado o registrado 
import { cookies } from 'next/headers'

import { AuthBtnServer } from './components/authBtn/authBtn-server'
import { redirect } from 'next/navigation'
import { PostsList } from './components/posts/postsList'
import { type Database } from './types/database'
import { ComposePost } from './components/compose/composePost'


export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  // se revisa a nivel de página si el usuario inició sesión
  // si no tiene sesión iniciada, no puede ver Home y se le redirige a Login
  if (session === null) {
    redirect("/login")
  }
  
  // para hacer consultas y que el usuario tenga acceso a la bdd, es necesario crear politicas para las tablas desde supabase
  const { data: rawPosts } = await supabase.from("posts")
    .select("*, users(*)")
    .order("created_at", { ascending: false })
  const posts = rawPosts?.map(post => ({ ...post, user: post.users })) ?? []
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className='pt-6 pb-6 max-w-[800px] w-full mx-auto flex justify-end'>
        <AuthBtnServer />
      </div>
      <section className='items-center max-w-[800px] w-full mx-auto border-l border-r border-t border-white/20 min-h-screen'>
        <ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url} />
        <PostsList posts={posts} />
      </section>

    </main>

  )
}
