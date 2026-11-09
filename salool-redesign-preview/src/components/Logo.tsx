type LogoProps = {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`brand-mark ${className}`} aria-hidden="true">
      <img src="/brand/logo-gold.svg" alt="" width={44} height={44} />
    </span>
  )
}

export function BrandLockup({ className = '' }: LogoProps) {
  return (
    <>
      <Logo />
      <span className={`brand-word ${className}`}>
        <span className="brand-name">Salool</span>{' '}
        <span className="brand-cafe">Café</span>
      </span>
    </>
  )
}
