import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { displayFont } from "@/lib/fonts";
import { site } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20 md:py-28">
      <Reveal>
        <div className="grid gap-10 rounded-3xl bg-card p-6 ring-1 ring-foreground/10 md:p-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs tracking-[0.22em] text-primary uppercase">Contact</p>
            <h2 className={`${displayFont.className} mt-3 text-4xl md:text-5xl`}>
              Tell me about the role
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Hiring managers and recruiters can send a note here. It comes to
              me by email. If the form is unavailable, write directly to{" "}
              <a className="text-primary underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </div>
          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
