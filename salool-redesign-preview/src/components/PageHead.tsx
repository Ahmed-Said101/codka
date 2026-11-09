import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  eyebrow: string
  title: ReactNode
  lead: string
  crumb?: string
  to?: string
}

export default function PageHead({ eyebrow, title, lead, crumb, to }: Props) {
  return (
    <div className="container-editorial page-head">
      {crumb && to ? (
        <p className="crumb">
          <Link to="/">Home</Link> / <Link to={to}>{crumb}</Link>
        </p>
      ) : null}
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      <p className="page-lead">{lead}</p>
    </div>
  )
}
