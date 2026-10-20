import Image from "next/image";
import Link from "next/link";

const charcoal = "#111111";

export default function FooterSection() {
  return <footer
  className="border-t"
  style={{
    borderColor: `${charcoal}10`,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(247,247,248,1) 100%)",
  }}
>
  <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-10 sm:text-left lg:px-12">
    <Link
      href="/"
      className="inline-flex items-center gap-3 transition-opacity hover:opacity-80"
    >
      <span
        className="flex size-9 items-center justify-center rounded-xl border bg-white"
        style={{
          borderColor: `${charcoal}10`,
          boxShadow: "0 8px 20px -14px rgba(17, 17, 17, 0.35)",
        }}
      >
        <Image src="/images/logo.png" alt="Beauty Clinic Logo" width={18} height={18} />
      </span>
      <span className="text-sm font-semibold tracking-tight">
        Beauty Clinic
      </span>
    </Link>
    <p className="text-sm" style={{ color: `${charcoal}80` }}>
      Better Skin · Brighter You
    </p>
  </div>
</footer>
}

