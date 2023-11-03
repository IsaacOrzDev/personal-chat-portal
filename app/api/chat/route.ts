import { kv } from '@vercel/kv'
import { OpenAIStream, ReplicateStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import Replicate from 'replicate'
import { experimental_buildLlama2Prompt } from 'ai/prompts'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY
// })

// const openai = new OpenAIApi(configuration)

// export async function POST(req: Request) {
//   const json = await req.json()
//   const { messages, previewToken } = json
//   const userId = (await auth())?.user.id

//   if (!userId) {
//     return new Response('Unauthorized', {
//       status: 401
//     })
//   }

//   if (previewToken) {
//     configuration.apiKey = previewToken
//   }

//   const res = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages,
//     temperature: 0.7,
//     stream: true
//   })

//   const stream = OpenAIStream(res, {
//     async onCompletion(completion) {
//       const title = json.messages[0].content.substring(0, 100)
//       const id = json.id ?? nanoid()
//       const createdAt = Date.now()
//       const path = `/chat/${id}`
//       const payload = {
//         id,
//         title,
//         userId,
//         createdAt,
//         path,
//         messages: [
//           ...messages,
//           {
//             content: completion,
//             role: 'assistant'
//           }
//         ]
//       }
//       await kv.hmset(`chat:${id}`, payload)
//       await kv.zadd(`user:chat:${userId}`, {
//         score: createdAt,
//         member: `chat:${id}`
//       })
//     }
//   })

//   return new StreamingTextResponse(stream)
// }

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || ''
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await replicate.predictions.create({
    // You must enable streaming.
    stream: true,
    // The model must support streaming. See https://replicate.com/docs/streaming
    // This is the model ID for Llama 2 70b Chat
    version: 'f4e2de70d66816a838a89eeeb621910adffb0dd0baba3976c96980970978018d',
    // Format the message list into the format expected by Llama 2
    // @see https://github.com/vercel/ai/blob/99cf16edf0a09405d15d3867f997c96a8da869c6/packages/core/prompts/huggingface.ts#L53C1-L78C2
    input: {
      prompt: experimental_buildLlama2Prompt(messages)
    }
  })

  // Convert the response into a friendly text-stream
  const stream = await ReplicateStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
