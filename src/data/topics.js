export const topics = [
    {
        id: 1,
        slug: "trigonometry",
        name: "Trigonometry",
        description: "Master trigonometric ratios, identities, and their applications in solving real-world geometric and engineering problems.",
        subjectSlug: "combined-maths",
        gradeSlug: "grade-12",
        syllabusSlug: "local-al",
        order: 1,
        difficulty: "Intermediate",
        estimatedHours: 12,
        prerequisites: ["Basic Algebra", "Geometry Fundamentals"],
        learningOutcomes: [
            "Define and apply the six trigonometric ratios",
            "Prove and use fundamental trigonometric identities",
            "Solve trigonometric equations within given intervals",
            "Apply sine and cosine rules to non-right-angled triangles"
        ],
        relatedTopics: ["complex-numbers", "vectors"],

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
        description: "Explore the world of imaginary numbers, Argand diagrams, modulus-argument form, and De Moivre's theorem.",
        subjectSlug: "combined-maths",
        gradeSlug: "grade-12",
        syllabusSlug: "local-al",
        order: 2,
        difficulty: "Advanced",
        estimatedHours: 10,
        prerequisites: ["Trigonometry", "Polynomial Equations"],
        learningOutcomes: [
            "Understand and perform arithmetic with complex numbers",
            "Represent complex numbers geometrically on an Argand diagram",
            "Convert between Cartesian and polar form",
            "Apply De Moivre's theorem to find roots and powers"
        ],
        relatedTopics: ["trigonometry", "vectors"],

        videos: [],

        materials: [],

        tutors: [
            "john-perera",
        ],
    },

    {
        id: 3,
        slug: "vectors",
        name: "Vectors",
        description: "Understand vector algebra, dot and cross products, and the applications of vectors in 2D and 3D space.",
        subjectSlug: "combined-maths",
        gradeSlug: "grade-12",
        syllabusSlug: "local-al",
        order: 3,
        difficulty: "Intermediate",
        estimatedHours: 8,
        prerequisites: ["Basic Algebra", "Coordinate Geometry"],
        learningOutcomes: [
            "Define vectors and perform vector addition and scalar multiplication",
            "Calculate dot product and interpret geometric meaning",
            "Find the angle between two vectors",
            "Apply vectors to solve geometric problems in 3D space"
        ],
        relatedTopics: ["trigonometry", "complex-numbers"],

        videos: [],

        materials: [],

        tutors: [
            "john-perera",
        ],
    },

    {
        id: 4,
        slug: "mechanics",
        name: "Mechanics",
        description: "Study the fundamental laws governing the motion of objects, forces, and energy in the physical world.",
        subjectSlug: "physics",
        gradeSlug: "grade-12",
        syllabusSlug: "local-al",
        order: 1,
        difficulty: "Intermediate",
        estimatedHours: 14,
        prerequisites: ["Basic Mathematics", "Introduction to Physics"],
        learningOutcomes: [
            "Apply Newton's three laws of motion to real-world problems",
            "Analyse projectile motion using kinematic equations",
            "Calculate work, energy, and power in mechanical systems",
            "Understand friction, tension, and normal force interactions"
        ],
        relatedTopics: ["waves"],

        videos: [],

        materials: [],

        tutors: [
            "sarah-silva",
        ],
    },

    {
        id: 5,
        slug: "waves",
        name: "Waves & Oscillations",
        description: "Investigate the properties, behaviour, and real-world applications of mechanical and electromagnetic waves.",
        subjectSlug: "physics",
        gradeSlug: "grade-12",
        syllabusSlug: "local-al",
        order: 2,
        difficulty: "Intermediate",
        estimatedHours: 10,
        prerequisites: ["Mechanics", "Basic Trigonometry"],
        learningOutcomes: [
            "Describe wave properties including amplitude, wavelength, frequency, and speed",
            "Distinguish between transverse and longitudinal waves",
            "Explain and calculate interference and diffraction patterns",
            "Understand the Doppler effect and its applications"
        ],
        relatedTopics: ["mechanics"],

        videos: [],

        materials: [],

        tutors: [
            "sarah-silva",
        ],
    },

    {
        id: 6,
        slug: "computer-networks",
        name: "Computer Networks",
        description: "Understand how data is transmitted across networks, network topologies, protocols, and the OSI model.",
        subjectSlug: "ict",
        gradeSlug: "grade-11",
        syllabusSlug: "local-ol",
        order: 1,
        difficulty: "Beginner",
        estimatedHours: 6,
        prerequisites: ["Introduction to ICT"],
        learningOutcomes: [
            "Identify and describe different network topologies",
            "Explain the role of the OSI and TCP/IP models",
            "Understand how IP addressing and subnetting works",
            "Describe the function of common network devices"
        ],
        relatedTopics: ["database-concepts"],

        videos: [],

        materials: [],

        tutors: [
            "nimal-fernando",
        ],
    },

    {
        id: 7,
        slug: "database-concepts",
        name: "Database Concepts",
        description: "Learn the fundamentals of relational databases, entity-relationship modelling, and writing SQL queries.",
        subjectSlug: "ict",
        gradeSlug: "grade-11",
        syllabusSlug: "local-ol",
        order: 2,
        difficulty: "Beginner",
        estimatedHours: 8,
        prerequisites: ["Introduction to ICT", "Computer Networks"],
        learningOutcomes: [
            "Design entity-relationship (ER) diagrams",
            "Understand primary keys, foreign keys, and relationships",
            "Write basic SQL SELECT, INSERT, UPDATE, and DELETE statements",
            "Describe the purpose of normalisation in database design"
        ],
        relatedTopics: ["computer-networks"],

        videos: [],

        materials: [],

        tutors: [
            "nimal-fernando",
        ],
    },
];
