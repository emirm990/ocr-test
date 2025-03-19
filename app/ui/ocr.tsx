'use client'

import { Button, Input, Stack, TextField, Typography } from "@mui/material"
import { LinearProgressWithLabel } from "./linear-progress"
import { getText } from "../lib/ocr"
import { ChangeEvent, useEffect, useState } from "react"

export default function Ocr() {
  const [extractedText, setExtractedText] = useState('')
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState<File | null>(null)

  const handleImageChanged = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) {
      return
    }

    setImage(files[0])
    getText(files[0]).then((res) => {
      setExtractedText(res.text)
    })
  }

  useEffect(() => {
    const handleMessages =  (event: MessageEvent) => {
      const { type, payload } = event.data
      if (type === 'ocr-progress' && payload.status === 'recognizing text') {
        setProgress(payload.progress * 100)
      }
    }
    window.addEventListener('message', handleMessages)

    return () => window.removeEventListener('message', handleMessages)
  })

  return (
    <Stack spacing={2}>
      <Typography align="center" variant="h5">Upload an image to extract text from it.</Typography>
      <Stack alignItems="center">
        <form >
          <Input type="file" onChange={handleImageChanged} />
          <Button>Submit</Button>
        </form>
      </Stack>
      {image && <img src={image ? URL.createObjectURL(image) : ''} alt="Uploaded image" style={{ maxWidth: '100%' }} />}
      <LinearProgressWithLabel value={progress} />
      <TextField value={extractedText} multiline fullWidth/>
    </Stack>
  )
}