import data from '@/content/portfolio.json';
import { sitePath } from '@/lib/site-path';

function NameSprite() {
  return data.profile.nameSprite.enabled ? (
    <span
      className="name-sprite"
      title={data.profile.nameSprite.label}
      aria-hidden="true"
      style={{
        backgroundImage: `url(${sitePath(data.profile.nameSprite.image)})`,
        backgroundSize: data.profile.nameSprite.backgroundSize,
        backgroundPosition: data.profile.nameSprite.backgroundPosition,
      }}
    />
  ) : null;
}
export function ProfileName() {
  const words = data.profile.name.trim().split(/\s+/);
  // Mantém a última parte do sobrenome e o sprite opcional na mesma linha.
  const suffixLength = ['de', 'da', 'do', 'das', 'dos'].includes(
    words.at(-2)?.toLowerCase() || '',
  )
    ? 2
    : 1;
  const prefix = words.slice(0, -suffixLength).join(' ');
  const suffix = words.slice(-suffixLength).join(' ');
  return (
    <span className="name-with-sprite">
      {prefix && <>{prefix} </>}
      <span className="name-ending">
        {suffix}
        <NameSprite />
      </span>
    </span>
  );
}
