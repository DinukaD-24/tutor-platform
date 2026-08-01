import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { tutorId, studentName, rating, comment } = body;

    if (!tutorId || !studentName || !rating) {
      return NextResponse.json(
        { error: "Please provide tutor ID, your name, and a rating." },
        { status: 400 }
      );
    }

    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: "Rating must be a number between 1 and 5." },
        { status: 400 }
      );
    }

    // Check tutor exists
    const tutor = await prisma.tutor.findUnique({ where: { id: tutorId } });
    if (!tutor) {
      return NextResponse.json({ error: "Tutor not found." }, { status: 404 });
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        student: studentName.trim(),
        rating: ratingNum,
        comment: comment?.trim() || null,
        date: new Date(),
        tutorId,
      },
    });

    // Recalculate tutor's average rating and reviewsCount
    const allReviews = await prisma.review.findMany({
      where: { tutorId },
      select: { rating: true },
    });

    const newCount = allReviews.length;
    const newAvg = allReviews.reduce((sum, r) => sum + r.rating, 0) / newCount;

    await prisma.tutor.update({
      where: { id: tutorId },
      data: {
        rating: parseFloat(newAvg.toFixed(2)),
        reviewsCount: newCount,
      },
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit review. Please try again." },
      { status: 500 }
    );
  }
}
