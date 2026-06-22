import { topics } from "@/data/topics";
import { tutors } from "@/data/tutors";

export default function TopicPage( {params} ) {
    const topic = topics.find(
        (t) => t.slug === params.topicSlug
    );

    if(!topic) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-10">
                Topic not found
            </div>
        );
    }

    const topicTutors = tutors.filter(
        (tutor) => 
        topic.tutors.includes(tutor.slug)
    );

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
            <div>
                <h1 className="text-4xl font-bold">
                    {topic.name}
                </h1>

                <p className="text-gray-600 mt-2">
                    {topic.description}
                </p>
            </div>

            <section>
                <h2 className="text-2xl font-semibold mb-4">
                    Video Lessons
                </h2>

                <div className="space-y-8">
                    {topic.videos.map((video) => {
                        const tutor = tutors.find(
                            (t) => t.slug === video.tutorSlug
                        );

                        return (
                            <div key={video.youtubeId}>
                                <h3 className="font-semibold mb-2">
                                    {video.title}
                                </h3>

                                <p className="text-sm text-gray-500 mb-3">
                                    {tutor?.name}
                                </p>

                                <div className="aspect-video rounded-xl overflow-hidden">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                        className="h-full w-full"
                                        allowFullScreen                               
                                    />
                                </div>
                            </div>   
                        );
                    })}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">
                    Study Materials
                </h2>

                <div className="space-y-3">
                    {topic.materials.map((material) => (
                        <a
                            key={material.title}
                            href={material.url}
                            download
                            className="block text-primary hover:underline"
                        >
                            {material.title}
                        </a>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">
                    Recommended Tutors
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                    {topicTutors.map((tutor) => (
                        <div
                            key={tutor.id}
                            className="border rounded-xl p-4 shadow-sm"
                        >
                            <h3 className="font-semibold">
                                {tutor.name}
                            </h3>

                            <p className="text-gray-600">
                                {tutor.subject}
                            </p>

                            <p className="text-sm text-gray-500">
                                {tutor.tutorType}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}