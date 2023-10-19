import NavbarSession from "./NavbarSession"
import { MainNav } from "./nav-links"
import { Search } from "./search"
import { ModeToggle } from "./theme-toggle"

const GlobalNav = () => {
  return (
    <div className="flex items-center h-16 gap-8 p-4 border-b">
      <MainNav />
      <Search />
      <div className="ml-auto gap-4 flex justify-end items-center">
        <ModeToggle />
        <NavbarSession />
      </div>
    </div>
  )
}

export default GlobalNav