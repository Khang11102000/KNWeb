import Menu from '@/components/menu'

const Sidebar = () => {
  return (
    <aside className='fixed top-0 left-0 w-[300px] h-full px-4'>
      {/* Logo */}
      <div>
        <h1 className='text-primary text-3xl py-6 text-center'>Admin Panel</h1>
      </div>

      {/* Menu */}
      <Menu />
    </aside>
  )
}

export default Sidebar
