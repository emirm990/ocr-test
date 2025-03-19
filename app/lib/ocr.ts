import Tesseract from "tesseract.js";

export const getText = async function(file: File){
  // A worker is created once and used every time a user uploads a new file.
  const worker = await Tesseract.createWorker("eng", 1, {
    logger: function(m){
      window.postMessage({type: 'ocr-progress', payload: m})
    }
  })
  const ret = await worker.recognize(file)

  await worker.terminate()

  return {
    text: ret.data.text,
  }
}