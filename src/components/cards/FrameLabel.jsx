export function FrameLabel({ children }) {
  return (
    <span className="absolute bottom-2.5 left-2.5 rounded-[3px] bg-white/85 px-2 py-0.5 font-mono text-[10px] text-ink-soft backdrop-blur-sm">
      {children}
    </span>
  );
}

export default FrameLabel;