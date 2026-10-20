import Image from "next/image";

const LoginHero = () => {
  return (
    <aside className="relative hidden overflow-hidden lg:block">
      <Image
        src="/images/michael-dagonakis-login.jpg"
        alt="Beauty clinic atmosphere"
        fill
        priority
        className="object-cover"
        sizes="50vw"
      />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(160deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.2) 45%, rgba(10,10,10,0.4) 100%)",
        }}
      />
      <div className="dashboard-fade-up absolute inset-x-0 bottom-0 p-10 xl:p-12">
        <div className="max-w-md">
          <p className="text-4xl font-semibold tracking-tight text-white xl:text-5xl">
            Beauty Clinic
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Sign in to manage appointments and keep your clinic running
            smoothly.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default LoginHero;
