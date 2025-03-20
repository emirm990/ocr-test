import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function fileToGenerativePart(path: string, mimeType: string) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}


export async function extractTextFromImage(path: string, mimeType: string) {
  const prompt = "Extract text from the following image";

  const imageParts = [
    fileToGenerativePart(path, mimeType),
  ];

  const generatedContent = await model.generateContent([prompt, ...imageParts]);

  return generatedContent.response.text();
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const imagePath = formData.get("imagePath") as string;

  const text = await extractTextFromImage(imagePath, 'image/*');

  return NextResponse.json({ text });
}
