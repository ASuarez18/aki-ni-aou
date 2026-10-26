"use client";

import { useId, useRef } from "react";
import { Heart, Mail, X } from "lucide-react";
import type { Profile } from "@/models/reunion";

import { paragraphs } from "@/data/CardContent";

type Props = {
  profile: Profile | null;
};

export default function AnniversaryLetter({ profile }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  if (profile !== "Sa-chan") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label="Open your anniversary letter"
        aria-haspopup="dialog"
        className="group relative grid size-11 place-items-center rounded-full
          border border-rust/30 bg-paper text-rust shadow-sm transition
          hover:-translate-y-1 hover:bg-rust/10
          motion-reduce:transform-none"
      >
        <Mail
          size={21}
          strokeWidth={1.5}
          className="transition group-hover:-rotate-6 motion-reduce:transform-none"
        />

        <span
          aria-hidden="true"
          className="absolute -right-1 -top-1 grid size-4 place-items-center
            rounded-full bg-rust text-paper 
            animate-letter-heartbeat group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused] motion-reduce:animate-none"
        >
          <Heart size={9} fill="currentColor" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialogRef.current?.close();
          }
        }}
        className="w-[min(640px,92vw)]! max-h-[85dvh]! overflow-y-auto p-0!"
      >
        <div className="relative px-7 py-12 sm:px-12">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close letter"
            className="absolute right-4 top-4 grid size-9 place-items-center
              rounded-full text-muted transition hover:bg-rust/10 hover:text-rust"
          >
            <X size={19} />
          </button>

          <div className="mb-9 text-center">
            <Heart
              size={32}
              fill="#a6513355"
              strokeWidth={1.5}
              className="mx-auto mb-5 text-rust animate-letter-heartbeat group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused] motion-reduce:animate-none"
            />

            <span className="eyebrow justify-center text-[14px]!">二人の8ヶ月</span>

            <h2 id={titleId} className="mb-3! mt-4! text-[26px]!">
              大好きなさーちゃんへ。
            </h2>

            <time
              dateTime="2026-10-25"
              className="text-xs tracking-widest text-muted"
            >
              2026年10月25日
            </time>
          </div>

          <div className="space-y-6 font-serif text-base leading-8 text-ink">
            <p className="text-base! text-ink/80">愛しいさーちゃんへ、</p>

            {paragraphs.map((p, i) => (
              <p key={i} className="text-base! text-ink/80">
                {p}
              </p>
            ))}

            <div className="pt-4 text-right">
              <p className="text-base! text-ink/80">愛してるよ、僕のかわいいお姫様。</p>
              <p className="text-base! text-ink/80">ありったけの愛を込めて、</p>
              <p className="text-xl! text-rust!">さーちゃんのくーちゃんより ♡</p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
