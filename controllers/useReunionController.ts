"use client";

import { useEffect, useState } from "react";

import {
  calendarCountdown,
  DEFAULT_REUNION,
  validTarget,
} from "@/models/reunion";

export function useReunionController() {
  const [now, setNow] = useState<number | null>(null);
  const [target, setTarget] = useState(DEFAULT_REUNION);
  const [custom, setCustom] = useState(false);
  const [storageWarning, setStorageWarning] = useState("");

  useEffect(() => {
    try {
      const t = localStorage.getItem("aki-reunion");
      if (t && validTarget(t)) {
        setTarget(t);
        setCustom(true);
      }
    } catch {
      setStorageWarning("Preferences will last for this visit only.");
    }
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  function saveTarget(value: string) {
    const t = value + ":00+09:00";
    if (!validTarget(t)) return false;
    setTarget(t);
    setCustom(true);
    try {
      localStorage.setItem("aki-reunion", t);
    } catch {
      setStorageWarning("Preferences will last for this visit only.");
    }
    return true;
  }
  
  return {
    now,
    target,
    custom,
    storageWarning,
    saveTarget,
    time: now === null ? null : calendarCountdown(target, now),
  };
}
