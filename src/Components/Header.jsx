import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Icon } from "@iconify/react";



const Header = () => {
    const { user, logout } = useAuth();
    return (

        <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Icon icon="solar:crown-star-bold" className="size-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-xl font-bold font-heading">{user.displayName || "unknow"}</h1>
                    <p className="text-xs text-muted-foreground">{user.score || 0} XP</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={logout}
                    className="size-10 cursor-pointer rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                    <Icon icon="line-md:logout" className="size-5" />
                </button>
            </div>
        </header>

    )
}
export default Header;