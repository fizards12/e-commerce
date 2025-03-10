import { Outlet } from "react-router-dom"
import AuthenticatorGaurd from "../components/AuthenticatorGaurd"

function Root() {
  return (
    <div className="w-full min-h-screen">
        <AuthenticatorGaurd/>
        <Outlet/>
    </div>
  )
}

export default Root