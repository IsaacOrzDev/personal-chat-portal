'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function IndexPage() {
  const router = useRouter()

  const init = async () => {
    const result = await fetch(process.env.NEXT_PUBLIC_CHAT_API ?? '', {}).then(
      res => res.json()
    )
    console.log('result', result)
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
