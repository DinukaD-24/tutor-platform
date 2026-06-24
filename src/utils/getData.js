import { syllabuses } from "@/data/syllabuses";
import { topics } from "@/data/topics";
import { tutors } from "@/data/tutors";

export function getSyllabus(syllabusSlug) {
    return syllabuses.find(
        (syllabus) => syllabus.slug === syllabusSlug
    );
}

export function getGrade(syllabusSlug, gradeSlug) {
    const syllabus = getSyllabus(syllabusSlug);

    return syllabus?.grades.find(
        (grade) => grade.slug === gradeSlug
    );
}

export function getSubject( syllabusSlug, gradeSlug, subjectSlug ) {
    const grade = getGrade(syllabusSlug, gradeSlug);

    return grade?.subjects.find(
        (subject) => subject.slug === subjectSlug
    );
}

export function getTopic(topicSlug) {
    return topics.find(
        (topic) => topic.slug === topicSlug
    );
}