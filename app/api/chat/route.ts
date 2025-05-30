import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "답변을 받아오지 못했어요.";

    return NextResponse.json({ answer: reply });
  } catch (error) {
    console.error("GPT API 호출 실패:", error);
    return NextResponse.json({ answer: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
