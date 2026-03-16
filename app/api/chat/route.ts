import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `Sen MedFlow platformasining tibbiy yordamchi botisan.
Foydalanuvchi simptomlarini aytganda:
1. Qisqacha tahlil qil
2. Mos dori tavsiya qil
3. Taxminiy narxini yoz (so'mda)
4. Qo'shimcha maslahat ber

Javobni FAQAT quyidagi JSON formatda qaytar, boshqa hech narsa yozma:
{"javob": "tahlil va maslahat matni", "dori": {"nomi": "Dori nomi", "narxi": 15000}}

Agar tibbiy savol bo'lmasa:
{"javob": "Javob matni", "dori": null}

Faqat o'zbek tilida javob ber. Qisqa va aniq bo'l.`,
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await response.json();
  const rawText = data.content?.[0]?.text || "";

  try {
    const clean = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ javob: rawText, dori: null });
  }
}
