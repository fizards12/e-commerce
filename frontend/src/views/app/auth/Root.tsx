import { Outlet } from "react-router-dom"
import authBanner from "../../../assets/images/auth_side.png"
const Root = () => {
    return (
        <div className="flex w-full flex-1">
            <div className="flex-1 h-[512px] bg-accent/25 max-md:hidden">
                <img src={authBanner} alt={"cart and mobile image"} className="h-full w-full object-contain" />
            </div>
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    )
}

export default Root