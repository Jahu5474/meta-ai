import Head from 'next/head'
import Image from 'next/image'
import { Box, Button, Heading } from '@chakra-ui/react'
import { useState } from 'react';

interface TranslationResponse {
  translatedText: string;
}

export default function Home() {
  const [translatedText, setTranslatedText] = useState("");

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
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Box>
      <Button onClick={handleTranslateClick}>
        Translate
      </Button>
      <p>
        Translated text: {translatedText}
      </p>
    </Box>
  )

}
