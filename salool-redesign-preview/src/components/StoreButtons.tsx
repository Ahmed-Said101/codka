import { LINKS } from '../data/site'
import { AppleIcon, PlayStoreIcon } from './Icons'

export default function StoreButtons() {
  return (
    <>
      <a
        className="store-btn store-btn--apple"
        href={LINKS.appStore}
        target="_blank"
        rel="noopener noreferrer"
      >
        <AppleIcon />
        <span>
          <small>Download on the</small>
          <strong>App Store</strong>
        </span>
      </a>
      <a
        className="store-btn store-btn--play"
        href={LINKS.googlePlay}
        target="_blank"
        rel="noopener noreferrer"
      >
        <PlayStoreIcon />
        <span>
          <small>Get it on</small>
          <strong>Google Play</strong>
        </span>
      </a>
    </>
  )
}
