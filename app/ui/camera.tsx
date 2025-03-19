import { Button, Stack } from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

type Props = {
  imageSrc: string | null | undefined;
  setImage: Dispatch<SetStateAction<string | null | undefined>>
}

const videoConstraints = {
  facingMode: 'environment'
}

export default function Camera(props: Props) {
  const {
    imageSrc,
    setImage: setImageSrc
  } = props

  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();

    setImageSrc(imageSrc);
  },[webcamRef, setImageSrc])

  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction="row">
        <Webcam ref={webcamRef} width={'100%'} style={{ display: imageSrc ? 'none' : 'block'}} minScreenshotWidth={4096} videoConstraints={videoConstraints} screenshotQuality={1} />
        {imageSrc && <img src={imageSrc} alt="captured" style={{ width: '100%', marginLeft: 0 }} />}
      </Stack>
      {!imageSrc && <Button onClick={capture}>Capture photo</Button>}
      {imageSrc && <Button variant="contained" color="warning" onClick={() => setImageSrc(null)}>Delete photo</Button>}
    </Stack>
  )
}
