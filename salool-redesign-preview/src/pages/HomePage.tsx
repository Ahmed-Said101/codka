import { useNavigate } from 'react-router-dom'
import Featured from '../components/Featured'
import Hero from '../components/Hero'
import Story from '../components/Story'
import type { MenuItem } from '../data/menu'

export default function HomePage() {
  const navigate = useNavigate()
  const openItem = (item: MenuItem) => navigate(`/menu/${item.id}`)

  return (
    <>
      <Hero />
      <Featured onSelect={openItem} />
      <Story />
    </>
  )
}
