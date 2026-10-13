export type Profile = "Sa-chan" | "Ku-chan";
export const DEFAULT_REUNION = "2026-11-02T11:00:00+09:00";
// TODO: Change to jap and texts

export const milestones = [
  {
    title: "すべてが始まった日。",
    date: "2026-01-24",
    caption: "あの日の「はじめまして」が、こんなに大切な出会いになるなんて。",
    symbol: "01",
  },
  {
    title: "少しずつ、ふたりの距離が近づいた日。",
    date: "2026-02-13",
    caption:
      "まだ知らないことばかりだったけど、もっとさーちゃんのことを知りたいと思ってた。",
    symbol: "02",
  },
  {
    title: "「ふたり」が始まった日。",
    date: "2026-02-25",
    caption: "この日から、ただの「好きな人」じゃなくて、大切な恋人になった。",
    symbol: "03",
  },
  {
    title: "もう一度、同じ街で。",
    date: "2026-08-03",
    caption:
      "出会った街に戻ってきてくれたね。一緒に過ごした3週間も、さーちゃんの誕生日をお祝いできたことも、ずっと大切な思い出だよ。",
    symbol: "04",
  },
];

export function countdown(target: string, now: number) {
  const seconds = Math.max(0, Math.floor((Date.parse(target) - now) / 1000));
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60,
    totalSeconds: seconds,
    arrived: seconds === 0,
  };
}
export function daysSince(date: string, now: number) {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  return Math.max(
    0,
    Math.round(
      (Date.parse(today + "T00:00:00Z") - Date.parse(date + "T00:00:00Z")) /
        86400000,
    ),
  );
}
export function validTarget(value: string): boolean {
  return Number.isFinite(Date.parse(value));
}

// Calendar months in Japan time, then weeks/days and exact remaining units.
export function calendarCountdown(target: string, now: number) {
  const total = countdown(target, now);
  if (total.arrived) return { ...total, months: 0, weeks: 0 };
  const offset = 9 * 3600000;
  const start = new Date(now + offset);
  const end = new Date(Date.parse(target) + offset);
  function advance(months: number) {
    const date = new Date(start);
    date.setUTCDate(1);
    date.setUTCMonth(start.getUTCMonth() + months);
    const lastDay = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0),
    ).getUTCDate();
    date.setUTCDate(Math.min(start.getUTCDate(), lastDay));
    return date;
  }
  let months =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    start.getUTCMonth();
  if (advance(months).getTime() > end.getTime()) months--;
  const remainder = countdown(target, advance(months).getTime() - offset);
  return {
    ...remainder,
    totalSeconds: total.totalSeconds,
    months,
    weeks: Math.floor(remainder.days / 7),
    days: remainder.days % 7,
  };
}
