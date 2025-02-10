import { Outlet } from "react-router-dom"

function Root() {
  return (
    <div className="bg-primary/10 w-full min-h-screen">
        <Outlet/>
    </div>
  )
}

export default Root