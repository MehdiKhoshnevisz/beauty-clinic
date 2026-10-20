import { UserRound, Shield, Heart, Leaf } from "lucide-react";

const charcoal = "#111111";
const ink = "#111111";

const features = [
  {
    icon: UserRound,
    title: "Skilled Specialists",
    description: "Experienced and certified beauty professionals.",
  },
  {
    icon: Shield,
    title: "Safe & Modern",
    description: "Advanced treatments in a clean, welcoming space.",
  },
  {
    icon: Heart,
    title: "Personalized Plans",
    description: "Care tailored to your unique skin and goals.",
  },
  {
    icon: Leaf,
    title: "Natural Results",
    description: "Enhance your beauty with subtle, lasting outcomes.",
  },
] as const;

export default function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 0% 0%, rgba(26,26,26,0.05), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 20%, rgba(26,26,26,0.04), transparent 50%), linear-gradient(180deg, #F4F4F5 0%, #EEEEF0 50%, #F7F7F8 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(rgba(26,26,26,0.045) 0.7px, transparent 0.7px)",
          backgroundSize: "18px 18px",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.5), transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-12 lg:py-28">
        <div className="dashboard-fade-up mx-auto max-w-2xl text-center">
          <p
            className="text-xs font-medium tracking-[0.14em] uppercase"
            style={{ color: `${charcoal}80` }}
          >
            Why Choose Us
          </p>
          <h2
            className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: charcoal }}
          >
            Expert Care, Lasting Results
          </h2>
          <p
            className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-pretty sm:mt-4 sm:max-w-xl sm:text-base lg:text-lg"
            style={{ color: `${charcoal}99` }}
          >
            Professional, personalized treatments with your health and beauty in
            mind.
          </p>
        </div>

        <ul
          id="services"
          className="dashboard-stagger mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-5"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 sm:p-6"
              style={{
                borderColor: `${charcoal}10`,
                background:
                  "linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.82) 100%)",
                boxShadow:
                  "0 1px 2px rgba(17,17,17,0.04), 0 12px 28px -20px rgba(17,17,17,0.28)",
              }}
            >
              <div
                className="mb-5 flex size-11 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: `${ink}10`, color: ink }}
              >
                <Icon className="size-5 stroke-[1.5]" aria-hidden />
              </div>
              <h3
                className="text-sm font-semibold tracking-tight"
                style={{ color: charcoal }}
              >
                {title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: `${charcoal}99` }}
              >
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
