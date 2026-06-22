import { syllabuses } from "./syllabuses";

export const topic = [
    {
        id: 1,
        slug: "trigonometry",
        name: "Trigonometry",
        description: "Introduction to trigonometric ratios and identities.",
        subjectSlug: "combined-maths",
        gradeSlug: "grade-12",
        syllabusSlug: "local-al",

        videos: [
            { 
                tutorSlug: "john-perera", 
                youtubeId: "abc123",
                title: "Introduction to Trigonometry", 
            },
            { 
                tutorSlug: "sarah-silva", 
                youtubeId: "xyz456",
                title: "Trigonometric Identities", 
            },
        ],

        materials: [
            { 
                title: "Theory Notes", 
                url: "/materials/trigonometry-notes.pdf" 
            },
            { 
                title: "Tutorial Sheet", 
                url: "/materials/trigonometry-tutorial.pdf"
            },
        ],

        tutors: [
            "john-perera",
            "sarah-silva",
        ],
    },

    {
        id: 2,
        slug: "complex-numbers",
        name: "Complex Numbers",
        description: "Learn about imaginary numbers and their applications.",
        subjectSlug: "combined-maths",
        gradeSlug: "grade-12",
        syllabusSlug: "local-al",

        videos: [],

        materials: [],

        tutors: [
            "john-perera",
        ],
    },
];