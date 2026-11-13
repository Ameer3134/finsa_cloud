import Container from "./Container";

// The dark title banner at the top of every inner page.
export default function PageHeader({ title,span, subtitle }: { title: string; span?:string; subtitle?: string }) {
  return (
    <section className="bg-brand-900 text-white">
      <Container className="py-10 sm:py-14">
        <h1 className="animate-fade-up font-display text-3xl font-bold sm:text-4xl">{title}
          <span className="text-accent-500">{span}</span>
        </h1>
        {/* <div className="mt-3 h-1 w-12 rounded-full bg-accent-500" /> */}
        {subtitle && <p className="mt-4 max-w-2xl text-accent-500">{subtitle}</p>}
      </Container>
    </section>
  );
}
