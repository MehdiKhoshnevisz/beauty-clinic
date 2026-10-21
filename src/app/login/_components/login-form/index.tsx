"use client";

import { type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useAuthCookie } from "@/hooks/use-auth-cookie";
import { loginAction } from "@/lib/auth-actions";
import { useLoginForm } from "./use-login-form";

export function LoginForm() {
  const { t } = useTranslation();
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

    const parsed = validate();
    if (!parsed) {
      return;
    }

    dispatch({ type: "SUBMIT_START" });

    try {
      const result = await loginAction(parsed.identifier, parsed.password);

      if (!result.success) {
        if (result.field) {
          dispatch({
            type: "SUBMIT_FAILURE",
            fieldErrors: { [result.field]: result.error },
          });
        } else {
          dispatch({
            type: "SUBMIT_FAILURE",
            formError: result.error,
          });
        }
        return;
      }

      setAuthCookie();
      toast.add({
        type: "success",
        title: t("login.successToast"),
      });
      router.replace("/dashboard");
    } catch {
      dispatch({
        type: "SUBMIT_FAILURE",
        formError: t("login.somethingWrong"),
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
          className="rounded-xl bg-destructive/8 px-3.5 py-3 text-sm text-destructive"
        >
          {formError}
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="identifier"
          className="text-xs font-medium text-charcoal/60"
        >
          {t("login.identifier")}
        </Label>
        <Input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          placeholder={t("login.identifierPlaceholder")}
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          aria-invalid={Boolean(fieldErrors.identifier)}
          aria-describedby={
            fieldErrors.identifier ? "identifier-error" : undefined
          }
          disabled={isSubmitting}
          className="h-11 rounded-xl border-0 bg-black/[0.035] px-3.5 text-sm ring-1 ring-charcoal/10 transition-all placeholder:text-charcoal/35 focus-visible:bg-white focus-visible:ring-charcoal/28"
        />
        {fieldErrors.identifier ? (
          <p
            id="identifier-error"
            role="alert"
            className="text-xs text-destructive"
          >
            {fieldErrors.identifier}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="text-xs font-medium text-charcoal/60"
        >
          {t("login.password")}
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
            className="h-11 rounded-xl border-0 bg-black/[0.035] px-3.5 pe-11 text-sm ring-1 ring-charcoal/10 transition-all placeholder:text-charcoal/35 focus-visible:bg-white focus-visible:ring-charcoal/28"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute top-1/2 end-3.5 -translate-y-1/2 text-xs font-medium text-charcoal/50 transition-colors hover:opacity-70"
            aria-label={
              showPassword ? t("login.hidePassword") : t("login.showPassword")
            }
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
            {t("login.signingIn")}
          </>
        ) : (
          t("login.continue")
        )}
      </Button>
    </form>
  );
}
