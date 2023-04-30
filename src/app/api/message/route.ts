import { ChatGPTMessage } from "@/lib/openai";
import { MessageArraySchema } from "../../../lib/validators/Message";
import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompt";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const parsedMessages = MessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text,
  }));

  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt
  })
}