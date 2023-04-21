import Head from 'next/head'
import Image from 'next/image'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react';
import { error } from 'console';

interface TranslationResponse {
  translatedText: string;
}

interface CustomError {
  message: string;
}

export default function Home() {
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState<CustomError | null>(null);

  const handleTranslateClick = () => {
    const data = {
      prompt: "Translate this text into Japanese: Hello, World!"
    };

    fetch("/api/translate", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json() as Promise<TranslationResponse>)
      .then(data => {
        setTranslatedText(data.translatedText);
        setError(null);
      })
      .catch((error: any) => {
        console.error(error);
        setError(error as CustomError);
      });
  };

  return (
    <Box>
      <Button onClick={handleTranslateClick}>
        Translate
      </Button>
      {error && <Text>Error: {error.message}</Text>}
      {translatedText && <Text>Translated text: {translatedText}</Text>}

    </Box>
  )

}
