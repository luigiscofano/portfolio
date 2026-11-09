import icons from '@/content/icons.json';
export type IconName = keyof typeof icons;

/** Ícones SVG decorativos: o texto do controle fornece o nome acessível. */
export function Icon({
  name,
  size = 20,
  className = '',
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const icon = icons[name];
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {icon.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export function ExternalIcon() {
  return <Icon name="arrow-up-right-from-square" size={12} />;
}
