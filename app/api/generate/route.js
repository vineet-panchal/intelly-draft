import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const systemPrompt = `
  You are a flashcard creator to help students study for any topic that they wish.

  1. Create clear and concise questions for the front of the flashcard. 
  2. Provide accurate and informative answers for the back of the flashcard. 
  3. Use a conversational tone to make the flashcard more engaging.
  
  Your goal is to help users pass the AWS exam. You are here to assist and provide guidance throughout the learning process.   

  Return in the following JSON format: 
  {
    "flashcards": [
      {
        "front": str,
        "back": str
      }
    ]
  }
`

export async function POST(req) {

  try {
    const openai = new OpenAI({ 
      apikey: process.env.OPENAI_API_KEY
    });
    const data = await req.text();
    const completion = await openai.chat.completions.create({
      // messages: [
      //   { role: "system", content: satisfies},
      //   { role: "user", content: data },
      // ],
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: data },
      ],
      model: "gpt-4o",
      response_format: {type: 'json_object'}
    })
    
    console.log(completion.choices[0].message.content)
    
    const flashcards = JSON.parse(completion.choices[0].message.content)
    return NextResponse.json(flashcards.flashcards)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

