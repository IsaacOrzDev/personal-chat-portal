'use client'

import { useChat, type Message } from 'ai/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'
import { ExternalLink } from './external-link'

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string
  api?: string
  question?: string
}

export function Chat({ id, className, api, question }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages: question
        ? [
            {
              id: 'question',
              role: 'user',
              content: question
            }
          ]
        : [
            {
              id: 'welcome',
              role: 'assistant',
              content: ''
            }
          ],
      id,
      api,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        id,
        previewToken
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      }
    })

  useEffect(() => {
    reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
            {isLoading &&
              messages.filter(x => x.role === 'user').length > 0 && (
                <div className="relative mx-auto max-w-2xl px-4 text-xs leading-normal text-muted-foreground">
                  The response time may vary occasionally due to its integration
                  with external services like{' '}
                  <ExternalLink href="https://replicate.com/">
                    Replicate
                  </ExternalLink>
                  .
                </div>
              )}
          </>
        ) : (
          // <EmptyScreen setInput={setInput} />
          <div />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </>
  )
}
