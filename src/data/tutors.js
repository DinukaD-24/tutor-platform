export const tutors = [
    {
        id: 1,
        name: "John Perera",
        subject: "Combined Maths",
        tutorType: "University Student",
        image: "/images/john.png",
        rating: 4.9,
        reviewsCount: 18,
        experience: "7 years",
        lessonsCount: 120,
        studentsCount: 340,
        university: "University of Moratuwa",
        languages: ["English", "Sinhala"],
        price: "LKR 1,500/hr",
        availability: { online: true, physical: true },
        email: "john.perera@example.com",
        phone: "+94 77 123 4567",
        location: "Colombo / Moratuwa",
        qualifications: [
            "B.Sc. Engineering (Hons) Undergraduate - UoM",
            "Passed G.C.E. A/L in Physical Science Stream with 3 A's",
            "O/L District Rank 12"
        ],
        specializations: ["Calculus", "Algebra", "Trigonometry", "Vectors"],
        teachingStyle: "Focuses on building concepts from the ground up, followed by solving past paper questions and practicing time-management techniques.",
        bio: "Hi, I'm John! I am a passionate engineering student who loves to teach Mathematics. Over the past 7 years, I have helped hundreds of students unlock their mathematical potential and excel in their exams. I believe that anyone can master Combined Maths with the right guidance and a structured approach.",
        reviews: [
            { id: 1, student: "Dinuka", rating: 5, comment: "Excellent explanation. Concepts are very clear now.", date: "2026-06-10" },
            { id: 2, student: "Kamal", rating: 5, comment: "Very patient teacher. Explains the same topic in different ways if needed.", date: "2026-06-08" },
            { id: 3, student: "Nimal", rating: 4, comment: "Great notes and exam-oriented approach.", date: "2026-05-25" }
        ]
    },
    {
        id: 2,
        name: "Sarah Silva",
        subject: "Physics",
        tutorType: "University Student",
        image: "/images/sarah.png",
        rating: 4.8,
        reviewsCount: 14,
        experience: "4 years",
        lessonsCount: 85,
        studentsCount: 210,
        university: "University of Colombo",
        languages: ["English", "Sinhala"],
        price: "LKR 1,800/hr",
        availability: { online: true, physical: false },
        email: "sarah.silva@example.com",
        phone: "+94 71 987 6543",
        location: "Colombo / Online Only",
        qualifications: [
            "B.Sc. (Hons) in Physics Undergraduate - University of Colombo",
            "A/L Physics - A grade (English Medium)",
            "Experienced online platform conductor"
        ],
        specializations: ["Mechanics", "Waves & Oscillations", "Electricity", "Electronics"],
        teachingStyle: "Interactive visual sessions using simulations, regular pop quizzes, and step-by-step derivations of physics principles.",
        bio: "Hello! I'm Sarah, and I specialize in making physics intuitive and fun. I use visual aids and online simulations to explain abstract physical concepts, ensuring that students not only pass their exams but also develop a genuine interest in how the universe works.",
        reviews: [
            { id: 1, student: "Anura", rating: 5, comment: "The simulations make mechanics so much easier to understand!", date: "2026-07-02" },
            { id: 2, student: "Kavindi", rating: 5, comment: "Her structured slides are amazing resources for revision.", date: "2026-06-15" }
        ]
    },
    {
        id: 3,
        name: "Nimal Fernando",
        subject: "ICT",
        tutorType: "Private Tutor",
        image: "/images/nimal.png",
        rating: 4.7,
        reviewsCount: 22,
        experience: "10 years",
        lessonsCount: 240,
        studentsCount: 520,
        university: "University of Kelaniya Graduate",
        languages: ["English", "Sinhala"],
        price: "LKR 2,000/hr",
        availability: { online: true, physical: true },
        email: "nimal.ict@example.com",
        phone: "+94 72 345 6789",
        location: "Gampaha / Colombo",
        qualifications: [
            "B.Sc. in Management Information Systems - UoK",
            "Professional Software Developer with 5+ years industry experience",
            "Former visiting lecturer at private institutes"
        ],
        specializations: ["Python & Programming", "Database Management", "HTML/CSS & Web Design", "Networking"],
        teachingStyle: "Hands-on coding exercises, real-world development examples, and syllabus-aligned mock papers.",
        bio: "Hey there! I am Nimal. With a decade of teaching and industry experience, I teach ICT with a practical approach. My classes are structured to give students solid theoretical knowledge along with hands-on coding practice so they are fully prepared for academic exams and beyond.",
        reviews: [
            { id: 1, student: "Dilshan", rating: 5, comment: "Learnt python from scratch easily. Highly recommended!", date: "2026-06-28" },
            { id: 2, student: "Sahan", rating: 4, comment: "Very practical lessons. The databases concepts are very clear now.", date: "2026-06-01" }
        ]
    },
    {
        id: 4,
        name: "Anne De Silva",
        subject: "Biology",
        tutorType: "University Student",
        image: "/images/anne.png",
        rating: 4.95,
        reviewsCount: 29,
        experience: "5 years",
        lessonsCount: 160,
        studentsCount: 410,
        university: "Faculty of Medicine, University of Colombo",
        languages: ["English", "Sinhala"],
        price: "LKR 2,200/hr",
        availability: { online: false, physical: true },
        email: "anne.med@example.com",
        phone: "+94 76 765 4321",
        location: "Kandy / Colombo",
        qualifications: [
            "MBBS Undergraduate (3rd Year) - Faculty of Medicine, UoC",
            "G.C.E. A/L Biology Stream - Island Rank 42",
            "Gold medalist in National Biology Olympiad"
        ],
        specializations: ["Human Physiology", "Genetics", "Plant Diversity", "Biochemistry"],
        teachingStyle: "Detailed, colorful diagrams, memory tricks (mnemonics) for complex terminologies, and structured essay writing techniques.",
        bio: "Hi! I'm Anne. As a medical student, I know the level of detail and memorization required to excel in Biology. I teach using custom illustrations and memorization techniques to make biological systems easy to recall during high-pressure exams.",
        reviews: [
            { id: 1, student: "Minura", rating: 5, comment: "Her mnemonics saved my exams. Outstanding diagrams!", date: "2026-07-05" },
            { id: 2, student: "Sajani", rating: 5, comment: "Best essay writing tips ever. Helped me score an A in mocks.", date: "2026-06-20" }
        ]
    }
];
