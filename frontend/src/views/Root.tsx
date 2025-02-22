import { Outlet } from "react-router-dom"
import AuthenticatorGaurd from "../components/AuthenticatorGaurd"

function Root() {
  return (
    <div className="bg-primary/10 w-full min-h-screen">
        <AuthenticatorGaurd/>
        <Outlet/>
    </div>
  )
}

export default Root