"use client";
import { useRef, useState } from "react";

import {
  ArrowDown,
  Heart,
  Leaf,
  MapPin,
  X,
  LogOut,
  Flower2,
  Gift,
} from "lucide-react";

import { useReunionController } from "@/controllers/useReunionController";
import { useSessionController } from "@/controllers/useSessionController";

import { daysSince, milestones, Profile } from "@/models/reunion";

import Reveal from "./components/Reveal";
import FallingLeaves from "./components/FallingLeaves";
import AnniversaryLetter from "./components/AnniversaryLetter";

export default function ReunionView() {
  const auth = useSessionController(true);
  if (!auth.ready || !auth.session)
    return (
      <main className="grid min-h-screen place-items-center">
        <p role="status" className="font-serif text-xl text-rust">
          ふたりの世界へ、もうすぐ…
        </p>
      </main>
    );
  return <Dashboard profile={auth.session.profile} logout={auth.logout} />;
}

function Dashboard({
  profile,
  logout,
}: {
  profile: Profile | null;
  logout: () => void;
}) {
  const c = useReunionController();
  const dialog = useRef<HTMLDialogElement>(null);

  const dateLabel = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo",
  }).format(new Date(c.target));

  return (
    <>
      <FallingLeaves />

      <header className="site-header">
        <a className="brand" href="#">
          <span className="brand-symbol">秋</span>
          <span>
            秋に会おう
            <small>Aki ni Aou</small>
          </span>
        </a>

        <nav
          aria-label="メインナビゲーション"
          className="text-sm tracking-[2px] gap-6"
        >
          <a href="#countdown">会える日まで</a>

          <a href="#story">ふたりの物語</a>

          <a href="#distance">離れていても</a>
        </nav>

        <div className="flex items-center gap-3">
          <AnniversaryLetter profile={profile} />
          <button
            onClick={logout}
            className="flex items-center gap-2  text-muted hover:text-rust text-sm tracking-[2px] transition-colors"
            aria-label="ログアウト"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">ログアウト</span>
          </button>
        </div>
      </header>

      <main>
        {/* > Hero */}

        <section className="hero gap-10" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow jap text-xs font-medium">
              <span />
              季節は変わっても、ふたりはふたり。
            </div>

            <p className="japanese">秋に会おう</p>

            <h1 id="hero-title" className="">
              Let's meet
              <br />
              in <em>autumn.</em>
            </h1>

            <p className="intro">
              冬に出会って、夏にまた会えて。
              <br className="desktop" />
              次は秋だね。今度は、どんな思い出ができるかな。
            </p>

            <div className="hero-note text-xs">
              <span className="tiny-leaf">❧</span>
              さーちゃんとくーちゃんだけの小さな世界
            </div>
          </div>

          <div className="hero-art">
            <div className="art-caption text-xs">次の物語 / 2026年 秋</div>

            <img
              src="/autumn-bear.png"
              alt="桜の木の上で眠る茶色いクマと、黄金色に染まった秋の葉"
            />

            <span className="art-seal">
              また
              <br />
              会おう
            </span>

            <p className="tracking-widest">
              季節が変わっても、想う気持ちは変わらない。
            </p>
          </div>

          <div className="scroll-note">
            <span className="text-[10px]">ふたりの物語をのぞいてみて</span>
            <ArrowDown size={14} />
          </div>
        </section>

        {/* > Welcome back */}
        <Reveal>
          <section className="welcome">
            <div>
              <span className="jap text-xs font-medium">
                ふたりだけの小さな場所
              </span>

              <h2 className="tracking-wider">
                おかえり、
                {profile === "Sa-chan" ? "さーちゃん" : "くーちゃん"}。
              </h2>

              <p className="tracking-widest text-sm">
                {profile === "Sa-chan"
                  ? "ここは、離れていてもふたりでいられる、小さな場所だよ。"
                  : "またここに来たね。秋に会える日まで、もう少し。"}
              </p>
            </div>

            <div className="flex items-center gap-3 text-rust">
              <span className="text-3xl" aria-hidden="true">
                {profile === "Sa-chan" ? "🌸" : "🐻"}
              </span>

              <span className="font-serif text-lg tracking-[5px] text-rust">
                {profile === "Sa-chan" ? "くーちゃんより、愛をこめて。" : ""}
              </span>
            </div>
          </section>
        </Reveal>

        {/* > Countdown */}
        <section id="countdown" className="countdown section">
          <Reveal>
            <div className="section-heading">
              <span className="jap text-xs font-medium">
                一 / 秋まで、あと少し
              </span>
              <h2 className="mt-0 font-serif tracking-[3px]">
                {c.time?.arrived
                  ? "画面越しじゃなくて、今度はすぐそばで。ずっと楽しみにしていた時間が、ようやく始まるね。"
                  : "また会える日まで、あと少し"}
              </h2>
              <p>
                {c.time?.arrived
                  ? "やっと、同じ秋を過ごせるね。"
                  : "離れている時間も、きっと無駄じゃない。だって、一秒ずつ、さーちゃんに会える日に近づいているから。"}
              </p>
            </div>
          </Reveal>
          <div className="digits">
            {(
              [
                "months",
                "weeks",
                "days",
                "hours",
                "minutes",
                "seconds",
              ] as const
            ).map((unit, i) => {
              const labels = {
                months: "ヶ月",
                weeks: "週間",
                days: "日",
                hours: "時間",
                minutes: "分",
                seconds: "秒",
              } as const;

              return (
                <Reveal key={unit} delay={i * 90}>
                  <div className="digit">
                    <span>
                      {c.time ? String(c.time[unit]).padStart(2, "0") : "—"}
                    </span>
                    <small className="text-xs">{labels[unit]}</small>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal>
            <p className="date-chip">
              <span className="status-dot" />
              {dateLabel} · 日本時間
            </p>
          </Reveal>
        </section>

        {/* > Perspectives */}
        <section className="perspectives section">
          <Reveal>
            <div className="section-heading">
              <span className="jap text-xs font-medium">
                会える日まで、あとどれくらい？
              </span>
              <h2 className="mt-0 font-serif tracking-[3px]">
                数え方は違っても、待っているのは同じ日。
              </h2>
            </div>
          </Reveal>
          <div className="perspective-grid">
            {[
              {
                unit: "weeks",
                label: "週間",
                divisor: 604800,
                desc: "あと何回、日曜日を迎えたら会えるかな。",
              },
              {
                unit: "days",
                label: "日",
                divisor: 86400,
                desc: "朝が来るたび、さーちゃんに会える日が近づいてくる。",
              },
              {
                unit: "hours",
                label: "時間",
                divisor: 3600,
                desc: "早く会いたいな。そんなことを考えている間にも、少しずつ近づいてる。",
              },
            ].map((item, i) => (
              <Reveal key={item.unit} delay={i * 100}>
                <article>
                  <span className="item-number text-xs">
                    {["一", "ニ", "三"][i]}
                  </span>
                  <strong>
                    {c.time
                      ? Math.floor(
                          c.time.totalSeconds / item.divisor,
                        ).toLocaleString("en-US")
                      : "—"}
                  </strong>
                  <span className="unit text-sm">あと {item.label}</span>
                  <p className="tracking-widest">{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* > Our Story  */}
        <section id="story" className="story section">
          <Reveal>
            <div className="section-heading">
              <span className="jap text-xs font-medium">ニ / ふたりの物語</span>
              <h2 className="mt-0 font-serif tracking-[3px]">
                秋を待つ前に、こんな日々があった。
              </h2>
              <p>
                出会った日も、恋人になった日も、 また会えた日も。
                どれも、さーちゃんとだから特別になった。
              </p>
            </div>
          </Reveal>
          <div className="timeline">
            {milestones.map((m, i) => (
              <Reveal key={m.date} delay={i * 120}>
                {/* TODO: Fix heights */}
                <article>
                  <div className="timeline-icon">
                    {i === 0 ? (
                      <Flower2 />
                    ) : i === 1 ? (
                      <Leaf />
                    ) : i === 2 ? (
                      <Heart />
                    ) : (
                      <Gift />
                    )}
                  </div>

                  <time dateTime={m.date}>
                    {new Intl.DateTimeFormat("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    }).format(new Date(m.date))}
                  </time>

                  <h3 className="text-2xl md:text-lg">{m.title}</h3>
                  <p>{m.caption}</p>

                  <span className="days-ago">
                    {c.now === null
                      ? "—"
                      : `あの日から${daysSince(m.date, c.now)}日`}
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* > Distance */}
        <section id="distance" className="distance section">
          <Reveal>
            <div className="distance-inner">
              <div>
                <span className="jap text-xs font-medium">
                  三 / 同じ空の下で
                </span>
                <h2 className="mt-4 font-serif tracking-[3px]">
                  違う街、違う時間。
                  <br />
                  <em>それでも、同じ空の下。</em>
                </h2>
                <p className="text-sm">
                  こっちが朝なら、そっちはもう夜。
                  <br />
                  見ている景色も、過ごしている時間も違うけど、
                  今日もどこかでさーちゃんが笑っていたらいいな。
                </p>
              </div>
              <div className="clocks">
                {[
                  {
                    city: "Vancouver",
                    zone: "America/Vancouver",
                    country: "CANADA",
                    locale: "en-CA",
                  },
                  {
                    city: "出雲",
                    zone: "Asia/Tokyo",
                    country: "日本",
                    locale: "ja-JP",
                  },
                ].map((city) => (
                  <div key={city.city}>
                    <span className="eyebrow text-xs tracking-[2px]">
                      <MapPin size={12} />
                      {city.country}
                    </span>

                    <h3>{city.city}</h3>

                    <strong>
                      {c.now
                        ? new Intl.DateTimeFormat(city.locale, {
                            timeZone: city.zone,
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          }).format(c.now)
                        : "—:—:—"}
                    </strong>

                    <small className="tracking-[1px]">
                      {c.now
                        ? new Intl.DateTimeFormat(city.locale, {
                            timeZone: city.zone,
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                          }).format(c.now)
                        : " "}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* > Closing  */}
        <Reveal>
          <section className="closing">
            <Leaf size={26} />

            <p>
              春も、夏も、秋も、冬も。
              <br />
              どんな季節も、さーちゃんと一緒がいい。
            </p>

            <span>秋に会おう · LET'S MEET IN AUTUMN</span>

            <a href="#" aria-label="ページの先頭へ戻る">
              ↑
            </a>
          </section>
        </Reveal>
      </main>

      <footer className="site-footer">
        <a className="brand tracking-widest" href="#">
          秋 <span>Aki ni Aou</span>
        </a>

        <span className="text-xs tracking-widest">
          さーちゃんへ、くーちゃんより。
        </span>

        <small className="text-xs tracking-widest">
          ふたりの秋の物語 · 2026
        </small>
      </footer>
    </>
  );
}
