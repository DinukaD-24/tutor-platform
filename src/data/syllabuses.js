export const syllabuses = [
  {
    id: 1,
    name: "Local A/L",
    slug: "local-al",
    grades: [
      {
        id: 1,
        name: "Grade 12",
        slug: "grade-12",
        order: 1,
        subjects: [
          {
            id: 1,
            name: "Combined Maths",
            slug: "combined-maths",
            topics: [
              "trigonometry",
              "complex-numbers",
              "vectors",
            ],
          },
          {
            id: 2,
            name: "Physics",
            slug: "physics",
            topics: [
              "mechanics",
              "waves",
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Grade 13",
        slug: "grade-13",
        order: 2,
        subjects: [
          {
            id: 1,
            name: "Chemistry",
            slug: "chemistry",
            topics: [
              "organic-chemistry",
              "chemical-equilibrium",
            ],
          },
        ],
      },
    ],
  },

  {
    id: 2,
    name: "Edexcel",
    slug: "edexcel",
    grades: [
      {
        id: 1,
        name: "AS Level",
        slug: "as-level",
        order: 1,
        subjects: [
          {
            id: 1,
            name: "Mathematics",
            slug: "mathematics",
            topics: [
              "pure-mathematics-1",
              "statistics-1",
            ],
          },
          {
            id: 2,
            name: "Physics",
            slug: "physics",
            topics: [
              "forces-and-motion",
            ],
          },
        ],
      },
      {
        id: 2,
        name: "A2 Level",
        slug: "a2-level",
        order: 2,
        subjects: [
          {
            id: 1,
            name: "Mathematics",
            slug: "mathematics",
            topics: [
              "pure-mathematics-3",
              "mechanics-1",
            ],
          },
        ],
      },
    ],
  },

  {
    id: 3,
    name: "Cambridge",
    slug: "cambridge",
    grades: [
      {
        id: 1,
        name: "AS Level",
        slug: "as-level",
        order: 1,
        subjects: [
          {
            id: 1,
            name: "Mathematics",
            slug: "mathematics",
            topics: [
              "algebra",
              "coordinate-geometry",
            ],
          },
          {
            id: 2,
            name: "Computer Science",
            slug: "computer-science",
            topics: [
              "data-representation",
              "algorithms",
            ],
          },
        ],
      },
      {
        id: 2,
        name: "A Level",
        slug: "a-level",
        order: 2,
        subjects: [
          {
            id: 1,
            name: "Physics",
            slug: "physics",
            topics: [
              "electric-fields",
              "quantum-physics",
            ],
          },
        ],
      },
    ],
  },

  {
    id: 4,
    name: "Local O/L",
    slug: "local-ol",
    grades: [
      {
        id: 1,
        name: "Grade 10",
        slug: "grade-10",
        order: 1,
        subjects: [
          {
            id: 1,
            name: "Mathematics",
            slug: "mathematics",
            topics: [
               "fractions",
               "percentage",
            ],
          },
          {
            id: 2,
            name: "Science",
            slug: "science",
            topics: [
              "human-body",
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Grade 11",
        slug: "grade-11",
        order: 2,
        subjects: [
          {
            id: 1,
            name: "Mathematics",
            slug: "mathematics",
            topics: [
              "probability",
              "statistics",
            ],
          },
          {
            id: 2,
            name: "ICT",
            slug: "ict",
            topics: [
              "computer-networks",
              "database-concepts",
            ],
          },
        ],
      },
    ],
  },
];