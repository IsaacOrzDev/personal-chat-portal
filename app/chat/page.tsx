import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'

export const runtime = 'edge'

interface Props {
  searchParams: any
}

export default function IndexPage(props: Props) {
  const id = nanoid()

  return (
    <Chat
      id={id}
      api={process.env.NEXT_PUBLIC_CHAT_API}
      question={props.searchParams?.question}
    />
  )
}
