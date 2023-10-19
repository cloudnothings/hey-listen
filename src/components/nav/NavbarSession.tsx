import SignInButton from "./SignInButton"
import { UserNav } from "./user-nav"
import { getServerAuthSession } from "@/server/auth"

const NavbarSession = async () => {
  const session = await getServerAuthSession()
  return (
    <div className="ml-auto">
      {session ?
        <UserNav
          email={session?.user?.email}
          image={session?.user?.image ?? ''}
          name={session?.user?.name ?? ''}
        /> :
        <SignInButton />
      }
    </div>
  )
}

export default NavbarSession
