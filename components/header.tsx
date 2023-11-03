import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { clearChats } from '@/app/actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { IconGitHub } from '@/components/ui/icons'

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <div className="flex items-center">
          <Button variant="link" asChild className="-ml-2 font-bold">
            <Link href="/">CHAT/</Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        {/* <ThemeToggle /> */}
        {/* <a
          target="_blank"
          href="https://github.com/vercel/nextjs-ai-chatbot/"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className="hidden ml-2 md:flex">GitHub</span>
        </a> */}
      </div>
    </header>
  )
}
