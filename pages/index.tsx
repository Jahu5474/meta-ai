import { Box, Button, Heading, Text, Textarea } from '@chakra-ui/react';
import React, { useRef } from 'react';

interface Conversation {
  role: string
  content: string
}



export default function Home() {




  const [value, setValue] = React.useState<string>("");
  const [conversation, setConversation] = React.useState<Conversation[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    []
  )

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const chatHistory = [...conversation, { role: "user", content: value }]
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ messages: chatHistory }),
      })

      const data = await response.json()
      setValue("")
      setConversation([
        ...chatHistory, { role: "assistant", content: data.result.choices[0].message.content },
      ])
    }
  }

  const handleRefresh = () => {
    inputRef.current?.focus()
    setValue("")
    setConversation([])
  }

  return (
    <Box w="full">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
        <Heading>
          Ava Chat Box
        </Heading>
      </Box>
      <Box>
        <Text>
          Enter your Prompt:
        </Text>
        <input
          placeholder='Type Here'
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleRefresh}>
          Start New Conversation
        </Button>

        <Box>
          {conversation.map((item, index) => (
            <React.Fragment key={index}>
              <br />
              {item.role === "assistant"} ? (
              <Box>
                <Box>
                  <Heading>Ava</Heading>
                  <br />
                  {item.content}
                </Box>
              </Box>
              ):(
              <Box>
                <Box>
                  <Heading>User</Heading>
                  <br />
                  {item.content}
                </Box>
              </Box>
              )

            </React.Fragment>
          ))}

        </Box>
      </Box>
    </Box>
  )
}
