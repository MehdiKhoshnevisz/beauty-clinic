import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "./_components/login-form";
import LoginHero from "./_components/login-hero";

export const metadata = {
  title: "Sign in · Beauty Clinic",
  description: "Sign in to manage beauty clinic reservations.",
};

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <LoginHero />

      <div className="relative flex min-h-svh flex-col overflow-hidden">
        <header className="dashboard-fade-in relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:justify-end">
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            Return to website
          </Link>
        </header>

        <main className="relative z-10 flex flex-1 items-center justify-center px-6 pb-16 sm:px-10">
          <div className="dashboard-fade-up w-full max-w-[400px]">
            <div className="mb-8">
              <p className="text-xs font-medium  uppercase text-gray-500">
                Staff access
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                Sign in
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Use your staff account to manage reservations and clinic
                activity.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border bg-white p-6 shadow-xs sm:p-8">
              <LoginForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
