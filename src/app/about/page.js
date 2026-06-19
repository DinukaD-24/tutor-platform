export default function AboutPage () {
    return (
        <section className="pt-24">

            <div className="max-w-5xl mx-auto px-6">
                <h1 className="text-5xl font-bold text-center mb-6">
                    About TutorHub
                </h1>

                <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
                    TutorHub connects students with qualified tutors,
                    giving tutors a platform to showcase their teaching
                    style and reach more students.
                </p>

                <div className="space-y-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">
                            Our Mission
                        </h2>

                        <p className="text-gray-600 leading-8">
                            Finding the right tutor can be difficult. Many 
                            talented university students and tutors struggle 
                            to reach students, while students struggle to 
                            discover quality educational content. TutorHub 
                            bridges this gap by bringing resources and tutors 
                            into one platform.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4">
                            How TutorHub Works
                        </h2>

                        <p className="text-gray-600 leading-8">
                            Tutors create a profile and showcase their teaching
                            style across their subjects and syllabuses.
                            Students can browse tutor profiles by syllabus, grade,
                            and subject to find the right fit for them.
                        </p>

                        <div>
                            <h2 className="text-3xl font-bold mt-4 mb-4">
                                Benefits for Students
                            </h2>

                            <ul className="list-disc ml-6 text-gray-600 space-y-2">
                                <li>Browse tutors across all syllabuses</li>
                                <li>Explore resources from different tutors</li>
                                <li>Find a teaching style that suits you</li>
                                <li>Discover tutors before joining classes</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mt-4 mb-4">
                                Benefits for Tutors
                            </h2>

                            <ul className="list-disc ml-6 text-gray-600 space-y-2">
                                <li>Promote teaching content</li>
                                <li>reach new students</li>
                                <li>Build credibility</li>
                                <li>Grow tutoring opportunities</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mt-4 mb-4">
                                Future Vision
                            </h2>

                            <p className="text-gray-600 leading-8">
                                We aim to become Sri Lanka's largest educational
                                discovery platform, helping students find the right 
                                tutors across local and international syllabuses.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}