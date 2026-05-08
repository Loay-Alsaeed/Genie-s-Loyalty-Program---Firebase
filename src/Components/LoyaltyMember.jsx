import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const LoyaltyMember = () => {
    const {user, prizes} = useAuth();
    const [lestScore, setLestScore] = useState(0);

    useEffect(() => {
        nextPrize();
    },[])

    const nextPrize = () => {
        if (user && prizes.length !== 0) {
            let lest = 0;
    
            for (const prize of prizes) {
                if (user.score < prize.score) {
                    lest = prize.score - user.score;
                    break; 
                }
            }
    
            setLestScore(lest);
        }
    };
    return (
        <div className="mb-5 relative overflow-hidden rounded-3xl p-6 border border-primary/20 hover:border-primary/40 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/16 rounded-full -mr-10 -mt-10 blur-xl" />
            <div className="absolute bottom-0 left-0 w-26 h-26 bg-black/14 rounded-full -ml-8 -mb-8 blur-x" />
            <div className="relative z-10">
                <div className="inline-flex items-center text-primary gap-2 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm text-xs font-medium  mb-3">
                    <Icon icon="solar:star-bold" className="size-3" />
                    <span>Loyalty Member</span>
                </div>
                <h2 className="text-2xl font-bold text-white font-heading mb-1">
                    Welcome back,<span className="text-primary">  {user.displayName}!</span>
                </h2>
                <p className="text-white/80 text-sm mb-4 max-w-[80%]">
                    You're just <span className="text-primary">{lestScore}</span> XP away from your next booster pack reward.
                </p>
                <Link to={'/prize'}>
                    <button className="bg-primary text-background px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm active:opacity-90 cursor-pointer hover:bg-primary/80 transition-all">
                        View My Progress
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default LoyaltyMember;