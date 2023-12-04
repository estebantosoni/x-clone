"use client"

import { useRef } from 'react'
import { addPost } from '../../actions/crudAction'
import ComposeTextBtn from './composeTextBtn'

export function ComposePost({ userAvatarUrl }: { userAvatarUrl: string }) {

  // TODO ESTE QUILOMBO ES PARA LIMPIAR EL FORM
  // se utiliza una variante (no documentada) de useOptimistic => https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations#optimistic-updates
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={async (formData) => {
      await addPost(formData)
      formRef.current?.reset()
    }}
    className='flex flex-row p-4 border-b border-white/20'>
        <img className='rounded-full w-10 h-10 object-contain mr-4' src={userAvatarUrl} />
        <div className='flex flex-1 flex-col gap-y-4'>
          <textarea name="content" rows={4}
              className='w-full text-xl bg-black placeholder-gray-500 p-4'
              placeholder='Escribe algo aquí' />
          <ComposeTextBtn />
        </div>
    </form>
  )
}
