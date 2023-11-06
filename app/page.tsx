'use client'

import { ExternalLink } from '@/components/external-link'
import { useTheme } from 'next-themes'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function IndexPage() {
  const router = useRouter()

  const params = useSearchParams()
  const { theme, setTheme } = useTheme()

  const init = async () => {
    const themeParam = params.get('theme')
    setTheme(themeParam ?? 'system')

    const questionParam = params.get('question')

    const result = await fetch(process.env.NEXT_PUBLIC_CHAT_API ?? '', {}).then(
      res => res.json()
    )
    if (result.status === 'ok') {
      router.replace(`/chat?question=${questionParam ?? ''}`)
    }
  }

  useEffect(() => {
    init()
  })

  return (
    <p className="mx-auto w-full py-10 text-center">
      Initialize the{' '}
      <ExternalLink href="https://aws.amazon.com/lambda/">
        Lambda Function
      </ExternalLink>{' '}
      in <ExternalLink href="https://aws.amazon.com/">AWS</ExternalLink>. It may
      take few seconds...
    </p>
  )
}
