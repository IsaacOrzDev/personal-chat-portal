'use client'

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

    const result = await fetch(process.env.NEXT_PUBLIC_CHAT_API ?? '', {}).then(
      res => res.json()
    )
    if (result.status === 'ok') {
      router.replace('/chat')
    }
  }

  useEffect(() => {
    init()
  })

  return (
    <div className="flex w-full justify-center py-10">
      Initialize the lambda function in AWS...
    </div>
  )
}
