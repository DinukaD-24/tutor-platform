import { NextResponse } from "next/server";
import { getSiteStats } from "@/utils/getData";

export async function GET() {
  try {
    const stats = await getSiteStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({
      formatted: { tutors: "50+", subjects: "500+", students: "1,000+", syllabuses: "4", avgRating: "4.9" }
    });
  }
}
