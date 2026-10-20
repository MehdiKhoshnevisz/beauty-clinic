"use client";

import { type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthCookie } from "@/hooks/use-auth-cookie";
import { useLoginForm } from "./use-login-form";
import { FieldErrors } from "./types";

export function LoginForm() {
  const router = useRouter();
  const { setAuthCookie } = useAuthCookie();

  const {
    state,
    dispatch,
    validate,
    setIdentifier,
    setPassword,
    togglePassword,
  } = useLoginForm();

  const {
    identifier,
    password,
    showPassword,
    fieldErrors,
    formError,
    isSubmitting,
  } = state;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    dispatch({ type: "SUBMIT_START" });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        field?: keyof FieldErrors;
      };

      if (!response.ok) {
        if (data.field && data.error) {
          dispatch({
            type: "SUBMIT_FAILURE",
            fieldErrors: { [data.field]: data.error },
          });
        } else {
          dispatch({
            type: "SUBMIT_FAILURE",
            formError: data.error ?? "Something went wrong. Try again.",
          });
        }
        return;
      }

      setAuthCookie();
      router.replace("/dashboard");
    } catch {
      dispatch({
        type: "SUBMIT_FAILURE",
        formError: "Connection failed. Try again.",
      });
    } finally {
      dispatch({ type: "SUBMIT_END" });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-5"
      noValidate
    >
      {formError ? (
        <div
          role="alert"
          className="rounded-xl px-3.5 py-3 text-sm"
          style={{
            backgroundColor: "rgba(185, 28, 28, 0.08)",
            color: "#B91C1C",
          }}
        >
          {formError}
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="identifier"
          className="text-xs font-medium text-charcoal/99"
        >
          Email or username
        </Label>
        <Input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          placeholder="you@clinic.com"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          aria-invalid={Boolean(fieldErrors.identifier)}
          aria-describedby={
            fieldErrors.identifier ? "identifier-error" : undefined
          }
          disabled={isSubmitting}
          className="h-11 rounded-xl border-0 bg-black/[0.035] px-3.5 text-sm ring-1 ring-[#1A1A1A]/10 transition-all placeholder:text-[#1A1A1A]/35 focus-visible:bg-white focus-visible:ring-[#1A1A1A]/28"
        />
        {fieldErrors.identifier ? (
          <p
            id="identifier-error"
            role="alert"
            className="text-xs"
            style={{ color: "#B91C1C" }}
          >
            {fieldErrors.identifier}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="text-xs font-medium text-charcoal/99"
        >
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={
              fieldErrors.password ? "password-error" : undefined
            }
            disabled={isSubmitting}
            className="h-11 rounded-xl border-0 bg-black/[0.035] px-3.5 pr-11 text-sm ring-1 ring-[#1A1A1A]/10 transition-all placeholder:text-[#1A1A1A]/35 focus-visible:bg-white focus-visible:ring-[#1A1A1A]/28"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute top-1/2 right-3.5 -translate-y-1/2 transition-colors hover:opacity-70 text-xs font-medium text-charcoal/80"
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={isSubmitting}
          >
            {showPassword ? (
              <EyeOff className="size-4" strokeWidth={1.5} aria-hidden />
            ) : (
              <Eye className="size-4" strokeWidth={1.5} aria-hidden />
            )}
          </button>
        </div>
        {fieldErrors.password ? (
          <p
            id="password-error"
            role="alert"
            className="text-xs text-destructive"
          >
            {fieldErrors.password}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="xl"
        disabled={isSubmitting}
        className="mt-1 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Signing in
          </>
        ) : (
          "Continue"
        )}
      </Button>
    </form>
  );
}
