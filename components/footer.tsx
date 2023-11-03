import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      The chatbot api built with{' '}
      <ExternalLink href="https://fastapi.tiangolo.com/">Fast API</ExternalLink>{' '}
      with{' '}
      <ExternalLink href="https://github.com/awslabs/aws-lambda-web-adapter">
        Lambda Web Adapter
      </ExternalLink>
      in <ExternalLink href="https://aws.amazon.com/">AWS</ExternalLink>.
    </p>
  )
}
