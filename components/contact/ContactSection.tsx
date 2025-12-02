import ContactForm from "./emails/ContactForm";

export default function ContactSection() {
    return (
        <section id="contact-section">
            <div className="max-w-5xl mx-auto px-4 md:px-0 space-y-8 md:py-28 pb-14">
                <div className="text-center md:text-left space-y-4">
                    <div>
                        <p className="mt-8 font-medium text-lime-300 text-lg">
                            Connect with me
                        </p>
                        <h2 className="text-5xl">Contact</h2>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="w-full md:flex-1 md:mr-4 text-center md:text-left">
                        <h1 className="font-semibold text-2xl mb-5 text-lime-300">
                            Let&apos;s build something great together! 🚀
                        </h1>
                        <p>
                            Whether it’s a quick question about my stack, a
                            challenging project idea, or just an interest in
                            connecting with a fellow developer, don&apos;t
                            hesitate to drop me a line!
                        </p>
                    </div>
                    <div className="w-full md:flex-1 bg-black/30 p-6 md:p-8 rounded-xl border-gray-50/10 border">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
