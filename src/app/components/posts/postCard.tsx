"use client"

import React from "react"
import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react"
import Link from "next/link"
import { IconHeart, IconMessageCircle, IconRepeat } from '@tabler/icons-react'
import { deletePost } from "@/app/actions/crudAction"

export default function PostCard({
  id,
  name,
  userName,
  avatarUrl,
  content
}: {
  id: string
  name: string
  userName: string
  avatarUrl: string
  content: string
}) {

  async function handleDeletePost(id: string) {
    await deletePost(id)
  }


  return (
    <Card className="shadow-none bg-transparent hover:bg-slate-800 transition border-b rounded-none cursor-pointer border-white/20">
      <CardHeader className="justify-between">
        <div className="flex gap-x-2">
          <Link href={`/${userName}`}>
            <Avatar radius="full" size="md" src={avatarUrl} />
          </Link>
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{name}</h4>
            <h5 className="text-small tracking-tight text-default-400">@{userName}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-xs text-white">
        <p>
          {content}
        </p>
      </CardBody>
      <CardFooter className="gap-3 flex-row">
        <button>
          <IconMessageCircle className="w-5 h-5" />
        </button>
        <button>
          <IconRepeat className="w-5 h-5" />
        </button>
        <button>
          <IconHeart className="w-5 h-5" />
        </button>
        <button onClick={() => { handleDeletePost(id) }} className="max-w-[800px] w-full mx-auto flex justify-end">
        <svg xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-trash"
          width="24" height="24" viewBox="0 0 24 24"
          strokeWidth="2" stroke="red"
          fill="none" strokeLinecap="round"
          strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
        </button>
      </CardFooter>
    </Card>
  )
}
