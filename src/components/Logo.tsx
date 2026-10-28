export default function Logo({
  size = 40,
  className = '',
  withGlow = false,
}: {
  size?: number;
  className?: string;
  withGlow?: boolean;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {withGlow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-70 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.8) 0%, rgba(229,193,88,0.3) 60%, transparent 80%)',
          }}
        />
      )}
      <div
        className="relative w-full h-full rounded-full overflow-hidden p-[2px] shadow-lg transition-transform hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, #ECC869 0%, #B38728 50%, #FDF3CD 80%, #996515 100%)',
        }}
      >
        <div className="w-full h-full rounded-full bg-[#121214] flex items-center justify-center overflow-hidden">
          <img
            src="/images/townhunt-logo.jpg"
            alt="TOMHUNT Logo"
            className="w-full h-full object-cover scale-105"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
