import { NextResponse } from "next/server";

export async function GET() {
  // In production, fetch from DB or CMS
  // For now, return hardcoded font settings
  return NextResponse.json({
    googleFont: 'Inter Tight', // Change to your default or CMS value
    customFontName: 'Inter Tight',
  });
}