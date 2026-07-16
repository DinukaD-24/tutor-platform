// @ts-nocheck
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { syllabuses } from "../src/data/syllabuses";
import { topics as topicsData } from "../src/data/topics";
import { tutors as tutorsData } from "../src/data/tutors";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding syllabuses, grades, subjects...");
  const subjectIdBySlugKey = new Map(); // key: `${syllabusSlug}/${gradeSlug}/${subjectSlug}`

  for (const syl of syllabuses) {
    const syllabus = await prisma.syllabus.upsert({
      where: { slug: syl.slug },
      update: { name: syl.name },
      create: { slug: syl.slug, name: syl.name },
    });

    for (const grade of syl.grades) {
      const gradeRow = await prisma.grade.upsert({
        where: { syllabusId_slug: { syllabusId: syllabus.id, slug: grade.slug } },
        update: { name: grade.name, order: grade.order },
        create: { slug: grade.slug, name: grade.name, order: grade.order, syllabusId: syllabus.id },
      });

      for (const subject of grade.subjects) {
        const subjectRow = await prisma.subject.upsert({
          where: { gradeId_slug: { gradeId: gradeRow.id, slug: subject.slug } },
          update: { name: subject.name },
          create: { slug: subject.slug, name: subject.name, gradeId: gradeRow.id },
        });
        subjectIdBySlugKey.set(`${syl.slug}/${grade.slug}/${subject.slug}`, subjectRow.id);
      }
    }
  }

  console.log("Seeding tutors...");
  const tutorIdBySlug = new Map();

  for (const t of tutorsData) {
    const data = {
      name: t.name,
      subject: t.subject,
      tutorType: t.tutorType,
      image: t.image,
      rating: t.rating,
      reviewsCount: t.reviewsCount,
      experience: t.experience,
      lessonsCount: t.lessonsCount,
      studentsCount: t.studentsCount,
      university: t.university,
      languages: t.languages,
      price: t.price,
      onlineAvailable: t.availability?.online ?? false,
      physicalAvailable: t.availability?.physical ?? false,
      email: t.email,
      phone: t.phone,
      location: t.location,
      qualifications: t.qualifications,
      specializations: t.specializations,
      teachingStyle: t.teachingStyle,
      bio: t.bio,
    };

    const tutorRow = await prisma.tutor.upsert({
      where: { slug: t.slug },
      update: data,
      create: { slug: t.slug, ...data },
    });
    tutorIdBySlug.set(t.slug, tutorRow.id);

    await prisma.review.deleteMany({ where: { tutorId: tutorRow.id } });
    if (t.reviews?.length) {
      await prisma.review.createMany({
        data: t.reviews.map((r) => ({
          student: r.student,
          rating: r.rating,
          comment: r.comment,
          date: new Date(r.date),
          tutorId: tutorRow.id,
        })),
      });
    }
  }

  console.log("Seeding topics...");
  const topicIdBySlug = new Map();

  for (const topic of topicsData) {
    const subjectKey = `${topic.syllabusSlug}/${topic.gradeSlug}/${topic.subjectSlug}`;
    const subjectId = subjectIdBySlugKey.get(subjectKey);

    if (!subjectId) {
      console.warn(`⚠️  Skipping topic "${topic.slug}" — no matching subject for ${subjectKey}`);
      continue;
    }

    const topicTutorIds = (topic.tutors ?? [])
      .map((slug) => tutorIdBySlug.get(slug))
      .filter(Boolean);

    const baseData = {
      name: topic.name,
      description: topic.description,
      order: topic.order,
      difficulty: topic.difficulty,
      estimatedHours: topic.estimatedHours,
      prerequisites: topic.prerequisites ?? [],
      learningOutcomes: topic.learningOutcomes ?? [],
      subjectId,
    };

    const topicRow = await prisma.topic.upsert({
      where: { slug: topic.slug },
      update: { ...baseData, tutors: { set: topicTutorIds.map((id) => ({ id })) } },
      create: { slug: topic.slug, ...baseData, tutors: { connect: topicTutorIds.map((id) => ({ id })) } },
    });
    topicIdBySlug.set(topic.slug, topicRow.id);

    await prisma.material.deleteMany({ where: { topicId: topicRow.id } });
    if (topic.materials?.length) {
      await prisma.material.createMany({
        data: topic.materials.map((m) => ({ title: m.title, url: m.url, topicId: topicRow.id })),
      });
    }

    await prisma.video.deleteMany({ where: { topicId: topicRow.id } });
    if (topic.videos?.length) {
      for (const v of topic.videos) {
        const tutorId = tutorIdBySlug.get(v.tutorSlug);
        if (!tutorId) {
          console.warn(`⚠️  Skipping video "${v.title}" — unknown tutor slug ${v.tutorSlug}`);
          continue;
        }
        await prisma.video.create({
          data: { youtubeId: v.youtubeId, title: v.title, topicId: topicRow.id, tutorId },
        });
      }
    }
  }

  console.log("Linking related topics...");
  for (const topic of topicsData) {
    const topicId = topicIdBySlug.get(topic.slug);
    if (!topicId || !topic.relatedTopics?.length) continue;

    const relatedIds = topic.relatedTopics.map((slug) => topicIdBySlug.get(slug)).filter(Boolean);
    await prisma.topic.update({
      where: { id: topicId },
      data: { relatedTo: { set: relatedIds.map((id) => ({ id })) } },
    });
  }

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });