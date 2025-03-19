'use client'

import { Button, Input, Stack, TextField, Typography } from "@mui/material"
import { LinearProgressWithLabel } from "./linear-progress"
import { getText } from "../lib/ocr"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Camera from "./camera"

export default function Ocr() {
  const [extractedText, setExtractedText] = useState('')
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null | undefined>(null);

  const [useCamera, setUseCamera] = useState(false)


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

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    formData.append('text', extractedText)
    if (imageSrc) {
      const blob = await fetch(imageSrc).then((res) => res.blob())
      const file = new File([blob], `${new Date().toISOString()}.${blob.type.split('/')[1]}`, {type: blob.type, lastModified: Date.now()});
      formData.append('image', file)
    }

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
  }

  useEffect(() => {
    if (imageSrc) {
      async function getFileFromBlob() {
        if (!imageSrc) {
          return
        }

        const blob = await fetch(imageSrc).then((res) => res.blob())
        const file = new File([blob], `${new Date().toISOString()}.${blob.type.split('/')[1]}`, {type: blob.type, lastModified: Date.now()});

        return file
      }
      getFileFromBlob().then((file) => {
        if (!file) {
          return
        }

        getText(file).then((res) => {
          setExtractedText(res.text)
        })
      })
    } else {
      setExtractedText('')
      setProgress(0)
    }
  }, [imageSrc])

  useEffect(() => {
    if (useCamera) {
      setImage(null)
      setExtractedText('')
      setProgress(0)
    }
  }, [useCamera])
  return (
    <Stack spacing={2}>
      <Typography align="center" variant="h5">Upload an image to extract text from it.</Typography>
      <Button onClick={() => setUseCamera(!useCamera)}>{useCamera ? 'Upload image' : 'Use camera'}</Button>
      {useCamera && <Camera imageSrc={imageSrc} setImage={setImageSrc} />}
      <Stack alignItems="center">
        <form onSubmit={handleFormSubmit} style={{ width: '60%' }}>
          <Stack spacing={2}>
            {!useCamera ? (
              <Input
                fullWidth
                type="file"
                name="image"
                onChange={handleImageChanged}
                slotProps={{
                  input: { accept: 'image/*' },
                }}
              />) : null}
            <Button
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
      {image && <img src={image ? URL.createObjectURL(image) : ''} alt="Uploaded image" style={{ maxWidth: '100%' }} />}
      <LinearProgressWithLabel value={progress} />
      <TextField
        value={extractedText}
        multiline
        fullWidth
        onChange={(e) => {
          setExtractedText(e.target.value)
        }}
      />
    </Stack>
  )
}