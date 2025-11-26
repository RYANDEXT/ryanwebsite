"use client";

export default function ContactSection() {
  return (
    <section id="contact-section">
      <div className="max-w-5xl mx-auto space-y-8 md:py-28 pb-14">
        <div className="text-left space-y-4">
          <div>
            <p className="mt-8 font-medium text-lime-300 text-lg">My Work</p>
            <h2 className="text-5xl">Projects</h2>
          </div>
        </div>
      </div>
      <button
        className="bg-green-500 w-lg rounded-2xl"
        onClick={async () => {
          await fetch("/api/send", { method: "POST" });
        }}
      >
        SEND
      </button>
    </section>
  );
}
