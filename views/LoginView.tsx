"use client";
import { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";

import { useSessionController } from "@/controllers/useSessionController";
import type { Profile } from "@/models/reunion";
import FallingLeaves from "./components/FallingLeaves";

export default function LoginView() {
  const c = useSessionController();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [answer, setAnswer] = useState("");
  if (!c.ready || c.session)
    return (
      <main className="grid min-h-screen place-items-center">
        <p role="status" className="font-serif text-xl text-rust">
          Opening our little world…
        </p>
      </main>
    );
  return (
    <main className="relative isolate grid min-h-screen place-items-center overflow-hidden px-6 py-12">
      <FallingLeaves />
      <div className="w-full max-w-5xl items-center gap-14 md:grid md:grid-cols-2">
        <div className="text-center">
          <p className="eyebrow justify-center">A NEW SEASON. THE SAME US.</p>
          <img
            className="mx-auto my-4 w-full max-w-md mix-blend-multiply rounded-2xl shadow hover:scale-105 transition duration-300"
            src="/autumn-bear.png"
            alt="Our sleeping bear in an autumn sakura tree"
          />
          <h1 className="!m-0 !text-5xl !tracking-tight">秋に会おう</h1>
          <p className="mt-4 font-serif text-xl italic text-rust">
            Let’s meet in autumn.
          </p>
        </div>
        <div className="mt-10 rounded-xl border border-line bg-paper/70 p-7 shadow-sm backdrop-blur-sm md:mt-0 md:p-10">
          <span className="eyebrow">JUST THE TWO OF US</span>
          <h2 className="my-4 text-3xl">Welcome home.</h2>
          <p className="text-sm leading-7 text-muted">
            Before crossing the bridge, tell me… who has arrived today?
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void c.login(profile, answer);
            }}
            className="mt-6"
          >
            <fieldset>
              <legend className="sr-only">Choose your profile</legend>
              <div className="grid grid-cols-2 gap-3">
                {(["Sa-chan", "Ku-chan"] as const).map((p, i) => (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={profile === p}
                    onClick={() => setProfile(p)}
                    className={`flex flex-col items-center gap-3 rounded-lg border p-5 transition duration-300 hover:-translate-y-1 ${profile === p ? "border-rust bg-rust/10 text-rust" : "border-line bg-paper/60"}`}
                  >
                    <span className="text-3xl" aria-hidden="true">
                      {i === 0 ? "🌸" : "🐻"}
                    </span>
                    <span className="text-sm">I’m {p}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            {profile && (
              <div className="login-question mt-7">
                <label htmlFor="secret" className="block font-serif text-lg">
                  Name of the house where we met?
                </label>
                <input
                  id="secret"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  aria-describedby={c.error ? "login-error" : undefined}
                  aria-invalid={!!c.error}
                  className="mt-3 w-full rounded-md border border-line bg-paper/80 px-4 py-3 text-center tracking-widest outline-rust"
                  placeholder="Our little secret"
                />
                <button
                  className="primary !mt-4 w-full justify-between disabled:cursor-wait disabled:opacity-60"
                  disabled={c.busy}
                  type="submit"
                >
                  {c.busy ? "Opening the door…" : "Enter our world"}
                  <ArrowRight size={17} />
                </button>
              </div>
            )}
            {c.error && (
              <p
                id="login-error"
                role="alert"
                className="mt-4 text-sm leading-6 text-rust"
              >
                {c.error}
              </p>
            )}
          </form>
          <p className="mt-7 flex items-center justify-center gap-2 text-xs text-muted">
            <Heart size={12} /> A little world, just for us.
          </p>
        </div>
      </div>
    </main>
  );
}
