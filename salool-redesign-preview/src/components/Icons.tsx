import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  )
}

export function ArrowUp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20V5" />
      <path d="m6 11 6-6 6 6" />
    </svg>
  )
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  )
}

export function ChevronRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  )
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  )
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </svg>
  )
}

export function Pause(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 5v14" />
      <path d="M15 5v14" />
    </svg>
  )
}

export function Play(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 4.5 19 12 7 19.5v-15Z" />
    </svg>
  )
}

export function Star(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 2.5 5.6 6.1.7-4.5 4.2 1.2 6-5.3-3.1L6.7 19.5l1.2-6-4.5-4.2 6.1-.7L12 3Z" />
    </svg>
  )
}

export function Sparkle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2c.7 5.4 4.6 9.3 10 10-5.4.7-9.3 4.6-10 10-.7-5.4-4.6-9.3-10-10 5.4-.7 9.3-4.6 10-10Z" />
    </svg>
  )
}

export function Cup(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
      <path d="M16 10h2.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M7 5c0-1 1-1.4 1-2.4M11 5c0-1 1-1.4 1-2.4" />
    </svg>
  )
}

export function Gift(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="9" width="16" height="12" rx="1.5" />
      <path d="M12 9v12M4 13h16" />
      <path d="M12 9C10 9 7.5 8.4 7.5 6.4A2.4 2.4 0 0 1 12 5.6a2.4 2.4 0 0 1 4.5.8C16.5 8.4 14 9 12 9Z" />
    </svg>
  )
}

export function Heart(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
    </svg>
  )
}

export function Pin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

export function Clock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />
    </svg>
  )
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

export function Info(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  )
}

export function Bag(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 8h14l-1.2 12.5H6.2L5 8Z" />
      <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
    </svg>
  )
}

export function Search(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

export function Plus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}

export function Minus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function Trash(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V4.5h6V7" />
      <path d="M6.5 7 7.6 20.5h8.8L17.5 7" />
      <path d="M10.5 11v6M13.5 11v6" />
    </svg>
  )
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  )
}

export function XSocial(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.24 5.46-6.24Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
    </svg>
  )
}

export function AppleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M16.37 12.79c-.02-2.05 1.67-3.03 1.75-3.08-.95-1.4-2.44-1.59-2.97-1.61-1.26-.13-2.46.74-3.1.74-.64 0-1.63-.73-2.68-.71-1.38.02-2.65.8-3.36 2.04-1.43 2.49-.36 6.16 1.03 8.18.68.99 1.49 2.09 2.56 2.05 1.03-.04 1.42-.66 2.66-.66 1.25 0 1.6.66 2.69.64 1.1-.02 1.8-1 2.48-2 .78-1.14 1.1-2.25 1.12-2.31-.02-.01-2.15-.82-2.18-3.28ZM14.29 6.78c.57-.69.95-1.64.84-2.58-.81.03-1.8.54-2.38 1.22-.52.61-.98 1.58-.86 2.51.91.07 1.84-.46 2.4-1.15Z" />
    </svg>
  )
}

export function PlayStoreIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M4.3 2.4c-.33.35-.52.88-.52 1.58v16.04c0 .7.19 1.23.52 1.58l.08.08 10.53-10.5v-.26L4.38 2.32l-.08.08Z" opacity=".9" />
      <path d="m18.23 14.54-3.32-3.3v-.27l3.32-3.3.08.05 3.93 2.23c1.12.63 1.12 1.66 0 2.3l-3.93 2.24-.08.05Z" opacity=".7" />
      <path d="m18.31 14.49-3.4-3.38-10.53 10.5c.37.39 1 .44 1.7.05l12.23-7.17" opacity=".55" />
      <path d="M18.31 8.6 6.08 1.43c-.7-.4-1.33-.34-1.7.05l10.53 10.5 3.4-3.38Z" opacity=".8" />
    </svg>
  )
}
