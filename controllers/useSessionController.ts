"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  matchesSecret,
  parseSession,
  SESSION_DURATION,
  SESSION_KEY,
  type Session,
} from "@/models/session";

import type { Profile } from "@/models/reunion";

export function useSessionController(protectedPage = false) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    function check() {
      let current: Session | null = null;
      try {
        current = parseSession(localStorage.getItem(SESSION_KEY), Date.now());
      } catch {}
      setSession(current);
      setReady(true);
      if (protectedPage && !current) router.replace("/");
      if (!protectedPage && current) router.replace("/home/");
    }
    check();
    window.addEventListener("storage", check);
    const timer = setInterval(check, 60000);
    return () => {
      window.removeEventListener("storage", check);
      clearInterval(timer);
    };
  }, [protectedPage, router]);

  const login = useCallback(
    async (profile: Profile | null, answer: string) => {
      if (!profile) {
        setError("Choose Sa-chan or Ku-chan first.");
        return;
      }
      setBusy(true);
      setError("");
      try {
        if (!(await matchesSecret(answer))) {
          setError("That’s not our secret. Try again, my love.");
          return;
        }
        const next = { profile, expiresAt: Date.now() + SESSION_DURATION };
        try {
          localStorage.setItem(SESSION_KEY, JSON.stringify(next));
        } catch {
          setError("Please allow browser storage to enter our world.");
          return;
        }
        setSession(next);
        router.replace("/home/");
      } catch {
        setError("Could not check your answer. Please try again.");
      } finally {
        setBusy(false);
      }
    },
    [router],
  );

  function logout() {
    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem("aki-profile");
    } catch {}
    setSession(null);
    router.replace("/");
  }
  
  return { session, ready, error, busy, login, logout };
}
