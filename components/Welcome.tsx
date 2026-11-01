import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ImageSlot from "@/components/ui/ImageSlot";
import { images } from "@/lib/images";
import { quickLinks, site } from "@/lib/site";

// The home page people see BEFORE logging in. Nothing private is shown here.
export default function Welcome() {
  return (
    <>
      <section className="bg-white">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:py-20">
          <div className="animate-fade-up">
            <p className="text-sm font-semibold text-brand-400">{site.association}</p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] text-brand-900 sm:text-5xl lg:text-6xl">
              Everything a Finance student needs, in one place.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Log in or create a free account to open study materials, announcements, the department handbook and more.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/login" variant="primary">Log in</ButtonLink>
              <ButtonLink href="/signup" variant="outline">Sign up</ButtonLink>
            </div>
          </div>

          <div className="animate-float">
            <ImageSlot src={images.hero} alt="FINSA hero image" label="Hero image (1200×900)" priority className="aspect-[4/3] w-full rounded-2xl" />
          </div>
        </Container>
      </section>

      <section className="pt-16">
        <Container>
          <h2 className="font-display text-2xl font-bold text-brand-900 sm:text-3xl">What’s inside</h2>
          <p className="mt-2 text-slate-600">Create an account to unlock all of this.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((c, i) => (
              <li key={c.href} className="animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <Card className="h-full">
                  <span className="text-3xl" aria-hidden="true">{c.icon}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-brand-900">{c.label}</h3>
                  <p className="mt-1 text-sm text-slate-600">{c.text}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="pt-20">
        <Container>
          <div className="rounded-2xl bg-brand-900 px-6 py-12 text-center sm:px-12">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Ready to ace this semester?</h2>
            <p className="mx-auto mt-3 max-w-lg text-brand-100">It takes less than a minute to create your account.</p>
            <ButtonLink href="/signup" variant="accent" className="mt-7">Create your account</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
