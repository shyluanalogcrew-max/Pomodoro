import { useState, useEffect, useRef } from "react";

const DURATION = 25 * 60; // 25 minutes, in seconds
const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const formatTime = (totalSeconds) => {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

export default function App() {
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const endTimeRef = useRef(null);

  // Tick against a fixed end timestamp so the timer doesn't drift
  // when the tab is throttled in the background.
  useEffect(() => {
    if (!isRunning) return;

    endTimeRef.current = Date.now() + secondsLeft * 1000;

    const id = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.round((endTimeRef.current - Date.now()) / 1000)
      );
      setSecondsLeft(remaining);
      if (remaining === 0) setIsRunning(false);
    }, 250);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  // Show the countdown in the browser tab title.
  useEffect(() => {
    document.title = isRunning
      ? `${formatTime(secondsLeft)} · Focus`
      : "Pomodoro Timer";
  }, [secondsLeft, isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(DURATION);
  };

  const isFinished = secondsLeft === 0;
  const progress = secondsLeft / DURATION;

  const baseBtn =
    "rounded-full px-6 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 p-4 text-slate-100">
      <section className="w-full max-w-sm rounded-3xl bg-slate-800 p-8 text-center shadow-2xl">
        <h1 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Pomodoro
        </h1>

        <div className="relative mx-auto mt-6 h-64 w-64">
          <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
            <circle
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              strokeWidth="8"
              className="stroke-slate-700"
            />
            <circle
              cx="100"
              cy="100"
              r={RADIUS}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              className={`transition-[stroke-dashoffset] duration-300 ease-linear ${
                isFinished ? "stroke-emerald-400" : "stroke-rose-400"
              }`}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-mono text-5xl font-bold tabular-nums"
              role="timer"
              aria-live="off"
            >
              {formatTime(secondsLeft)}
            </span>
            <span className="mt-1 text-sm text-slate-400">
              {isFinished ? "Time's up!" : isRunning ? "Focus" : "Ready"}
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {isRunning ? (
            <button
              onClick={() => setIsRunning(false)}
              className={`${baseBtn} bg-amber-400 text-slate-900 hover:bg-amber-300 focus-visible:ring-amber-400`}
            >
              Pause
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(true)}
              disabled={isFinished}
              className={`${baseBtn} bg-rose-500 text-white hover:bg-rose-400 focus-visible:ring-rose-400`}
            >
              {secondsLeft < DURATION && !isFinished ? "Resume" : "Start"}
            </button>
          )}
          <button
            onClick={handleReset}
            className={`${baseBtn} bg-slate-700 text-slate-100 hover:bg-slate-600 focus-visible:ring-slate-400`}
          >
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}
