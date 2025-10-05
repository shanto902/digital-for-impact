"use client";
import React, { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Collaborate() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const agree = data.get("agree") === "on";

    if (!name || !email || !message) {
      setStatus("error");
      setError("Please fill in your name, email, and message.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setError("Please provide a valid email address.");
      return;
    }
    if (!agree) {
      setStatus("error");
      setError("Please agree to the terms to proceed.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send");
      setStatus("success");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }

    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    form.reset();
  }

  return (
    <section
      className="
        relative
        bg-background transition-colors
        px-4 py-14
        sm:px-6
        md:px-10 md:py-20
        overflow-x-clip  /* prevent horizontal cut on mobile */
      "
    >
      {/* Ambient accent glow (responsive width, centered) */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2
          h-40 w-[26rem] sm:h-48 sm:w-[34rem] md:h-56 md:w-[42rem]
          rounded-[28rem] blur-3xl
          bg-[#c0ff72]/30 dark:bg-[#c0ff72]/15
          max-w-[92vw]  /* never exceed viewport width */
        "
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header + Form */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center">
          {/* Copy */}
          <div>
            <span
              className="
                inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium
                border-neutral-200 text-neutral-700 bg-neutral-50
                dark:border-white/10 dark:text-neutral-300 dark:bg-white/5
              "
            >
              <span className="inline-block size-2 rounded-full bg-[#c0ff72]" />
              Let’s collaborate
            </span>

            <h2 className="mt-4 text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Tell us about your project
            </h2>

            <p className="mt-3 max-w-xl text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              We focus on impact. Share your goals and constraints—timeline,
              budget, and audience—and we’ll get back within 1–2 business days.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block size-2.5 rounded-full bg-[#c0ff72]" />
                Strategy, product, and engineering—aligned to outcomes.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block size-2.5 rounded-full bg-[#c0ff72]" />
                Transparent collaboration and weekly updates.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block size-2.5 rounded-full bg-[#c0ff72]" />
                From MVPs to scale-ups—quality without the noise.
              </li>
            </ul>
          </div>

          {/* Form Card */}
          <div className="lg:ml-auto">
            <div
              className="
                rounded-2xl border bg-white/80 backdrop-blur shadow-xl
                border-neutral-200 dark:border-white/10 dark:bg-neutral-900/80
              "
            >
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 md:p-8">
                {/* Status messages */}
                {status === "success" && (
                  <div className="mb-4 rounded-lg border border-[#c0ff72]/40 bg-[#c0ff72]/15 px-4 py-3 text-sm text-neutral-800 dark:text-neutral-100">
                    ✅ Thanks! Your message has been sent. We’ll reach out soon.
                  </div>
                )}
                {status === "error" && error && (
                  <div className="mb-4 rounded-lg border border-red-300/50 bg-red-50/80 dark:bg-red-500/10 dark:border-red-500/30 px-4 py-3 text-sm text-red-700 dark:text-red-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      Full name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="
                        mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2
                        text-neutral-900 placeholder:text-neutral-400
                        focus:outline-none focus:ring-2 focus:ring-[#c0ff72] focus:border-[#c0ff72]
                        dark:border-white/10 dark:bg-neutral-900 dark:text-white
                      "
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      Work email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      placeholder="you@company.com"
                      className="
                        mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2
                        text-neutral-900 placeholder:text-neutral-400
                        focus:outline-none focus:ring-2 focus:ring-[#c0ff72] focus:border-[#c0ff72]
                        dark:border-white/10 dark:bg-neutral-900 dark:text-white
                      "
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Company Inc."
                      className="
                        mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2
                        text-neutral-900 placeholder:text-neutral-400
                        focus:outline-none focus:ring-2 focus:ring-[#c0ff72] focus:border-[#c0ff72]
                        dark:border-white/10 dark:bg-neutral-900 dark:text-white
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      Your role
                    </label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      placeholder="e.g., Product Lead"
                      className="
                        mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2
                        text-neutral-900 placeholder:text-neutral-400
                        focus:outline-none focus:ring-2 focus:ring-[#c0ff72] focus:border-[#c0ff72]
                        dark:border-white/10 dark:bg-neutral-900 dark:text-white
                      "
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      Project type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      className="
                        mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2
                        text-neutral-900 focus:outline-none focus:ring-2
                        focus:ring-[#c0ff72] focus:border-[#c0ff72]
                        dark:border-white/10 dark:bg-neutral-900 dark:text-white
                      "
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      <option>Product/MVP</option>
                      <option>Website/App Revamp</option>
                      <option>AI/Automation</option>
                      <option>eCommerce</option>
                      <option>Consulting</option>
                    </select>
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                    >
                      Budget range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="
                        mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2
                        text-neutral-900 focus:outline-none focus:ring-2
                        focus:ring-[#c0ff72] focus:border-[#c0ff72]
                        dark:border-white/10 dark:bg-neutral-900 dark:text-white
                      "
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      <option>$2k – $5k</option>
                      <option>$5k – $10k</option>
                      <option>$10k – $25k</option>
                      <option>$25k – $50k</option>
                      <option>$50k+</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                  >
                    What are we building? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="A few lines about your goals, users, timeline, and any links."
                    className="
                      mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-3
                      text-neutral-900 placeholder:text-neutral-400
                      focus:outline-none focus:ring-2 focus:ring-[#c0ff72] focus:border-[#c0ff72]
                      dark:border-white/10 dark:bg-neutral-900 dark:text-white
                    "
                    required
                  />
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <input
                    id="agree"
                    name="agree"
                    type="checkbox"
                    className="
                      mt-1 size-4 rounded border-neutral-300 text-neutral-900
                      focus:ring-2 focus:ring-[#c0ff72] focus:outline-none
                      dark:border-white/20 dark:bg-neutral-900
                    "
                  />
                  <label
                    htmlFor="agree"
                    className="text-sm text-neutral-600 dark:text-neutral-300"
                  >
                    I agree to the{" "}
                    <a
                      href="/privacy"
                      className="underline decoration-[#c0ff72] underline-offset-4 hover:opacity-80"
                    >
                      privacy policy
                    </a>
                    .
                  </label>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="
                      inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium
                      bg-[#c0ff72] text-neutral-900 hover:brightness-95 active:brightness-90
                      shadow-[0_10px_30px_-12px_rgba(192,255,114,0.6)]
                      transition-all disabled:opacity-60 disabled:cursor-not-allowed
                      w-full sm:w-auto   /* full width on mobile */
                    "
                  >
                    {status === "loading" ? (
                      <>
                        <span className="inline-block size-4 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent" />
                        Sending…
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>

                  <a
                    href="mailto:connect@digitalforimpact.net"
                    className="text-center sm:text-left text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                  >
                    Prefer email?{" "}
                    <span className="underline decoration-[#c0ff72] underline-offset-4">
                      connect@digitalforimpact.net
                    </span>
                  </a>
                </div>

                {/* honeypot */}
                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </form>
            </div>

            {/* tiny trust line */}
            <p className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
              We’ll never share your info. Response within 1–2 business days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
