import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Icon } from "@iconify/react";



const Header = () => {
    const { user, logout } = useAuth();
    return (

        <header className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
                <img src="/logo.jpeg" alt="Genie logo" className="h-16 w-22" />
                {/* <div>
                    <h1 className="text-xl font-bold font-heading">{user.displayName || "unknow"}</h1>
                    <p className="text-xs text-primary">{user.score || 0} XP</p>
                </div> */}
            </div>
            <div className="flex items-center gap-2">
                <button onClick={logout}
                    className="size-10 cursor-pointer rounded-full bg-white/20 text-foreground flex items-center justify-center">
                    <Icon icon="line-md:logout" className="size-5" />
                </button>
            </div>
        </header>

    )
}
export default Header;