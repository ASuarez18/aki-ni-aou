export default function FallingLeaves() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden motion-reduce:hidden"
      aria-hidden="true"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <span
          key={i}
          className="falling-leaf"
          style={{
            left: `${i * 8.5}%`,
            animationDelay: `-${i * 2.3}s`,
            animationDuration: `${17 + (i % 5) * 3}s`,
          }}
        >
          ❧
        </span>
      ))}
    </div>
  );
}
