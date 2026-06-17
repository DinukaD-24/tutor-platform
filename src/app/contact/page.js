export default function ContactPage() {
    return (
        <section className="pt-24">
            <div className="max-w-3xl mx-auto px-6">

                <h1 className="text-5xl font-bold text-center mb-6">
                    Contact Us
                </h1>

                <p className="text-center text-gray-600 mb-12">
                    Have a question or interested in becoming a tutor?
                    We'd love to hear from you.
                </p>

                <form className="space-y-6">

                    <div>
                        <label className="block mb-2 font-medium">
                            Name
                        </label>

                        <input
                            type="text"
                            className="w-full border rounded-xl px-4 py-3"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            className="w-full border rounded-xl px-4 py-3"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label>
                            Message
                        </label>

                        <textarea
                            rows="6"
                            className="w-full border rounded-xl px-4 py-3"
                            placeholder="How can we help?"
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-6
                        py-3
                        bg-primary
                        text-white
                        rounded-xl
                        hover:bg-primary-dark
                        transition
                    "
                    >
                        Send Message
                    </button>                    
                </form>
            </div>
        </section>
    );
}