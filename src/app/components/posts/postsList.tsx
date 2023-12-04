import PostCard from "./postCard"
import { type Post } from '@/app/types/posts'

export function PostsList({ posts }: { posts: Post[] | null }) { // TODO: cambió
  return (
    <>
      {
        posts?.map(post => { // TODO: cambió
          const {
            id,
            user,
            content
          } = post
              
          // TODO: cambió
          const userName = user?.user_name ?? ""
          const avatarUrl = user?.avatar_url ?? ""
          const name = user?.name ?? ""

          return <PostCard
                      key={id}
                      id={id}
                      name={name}
                      userName={userName}
                      avatarUrl={avatarUrl}
                      content={content}
                    />
        })
      }
    </>
  )
}
