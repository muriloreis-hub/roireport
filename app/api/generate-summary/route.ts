import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const { clientName, retainedFee, averageTicket, conversions, month } = await req.json();

    const fee = parseFloat(retainedFee) || 1500;
    const ticket = parseFloat(averageTicket) || 200;
    const leads = parseFloat(conversions) || 20;

    const estimatedRevenue = leads * ticket;
    const roiMultiplier = (estimatedRevenue / fee).toFixed(1);

    const prompt = `
      You are a C-level executive consultant for an agency reporting to a client (${clientName}).
      Financial Metrics for ${month || 'October 2026'}:
      - Client Monthly Retainer Fee Paid: $${fee}
      - Leads/Conversions Generated: ${leads}
      - Client Average Customer Value: $${ticket}
      - Total Estimated Revenue Generated: $${estimatedRevenue}
      - Calculated ROI: ${roiMultiplier}x

      Task: Write a highly persuasive 3-bullet-point executive statement in English proving that the agency retainer fee was a profitable investment for the client this month. Focus purely on dollar value and ROI. Keep it under 100 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({
      summary: response.text,
      estimatedRevenue: estimatedRevenue,
      estimatedRoi: `${roiMultiplier}x ROI`,
    });
  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate ROI summary' }, { status: 500 });
  }
}