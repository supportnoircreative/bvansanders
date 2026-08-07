export function Stat({ number, label }) {
  return (
    <div>
      <span className="font-display block text-[26px] text-orange">
        {number}
      </span>
      <span className="block text-[11.5px] uppercase tracking-[0.06em] text-ink-soft">
        {label}
      </span>
    </div>
  );
}

export default Stat;