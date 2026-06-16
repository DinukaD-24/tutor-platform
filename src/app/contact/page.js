export default function ContactPage() {
    return (
        <section>
            <div>

                <h1>
                    Contact Us
                </h1>

                <p>
                    Have a question or interested in becoming a tutor?
                    We'd love to hear from you.
                </p>

                <form>

                    <div>
                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            className="w-full border rounded-xl px-4 py-3"
                            placeholder="Your name"
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}