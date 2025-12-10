import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";


const HeroSection = () => {
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
        <section>
            <div className="grid grid-cols-2 gap-4 mb-5">
                <Link to={"/prize"} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-secondary hover:bg-secondary/80 border border-primary/20 transition-all active:scale-95 group">
                    <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon icon="solar:gift-bold" className="size-6" />
                    </div>
                    <span className="font-semibold text-sm">Prizes</span>
                </Link>
                <Link to={"/leaderpoint"} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-secondary hover:bg-secondary/80 border border-primary/20 transition-all active:scale-95 group">
                    <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon icon="solar:ranking-bold" className="size-6" />
                    </div>
                    <span className="font-semibold text-sm">Leaderboard</span>
                </Link>
            </div>
            <div className="mb-5 relative overflow-hidden rounded-3xl bg-primary p-6 shadow-lg shadow-primary/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-8 -mb-8 blur-xl" />
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium text-white mb-3">
                        <Icon icon="solar:star-bold" className="size-3" />
                        <span>Loyalty Member</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white font-heading mb-1">
                        Welcome back, {user.displayName}!
                    </h2>
                    <p className="text-white/80 text-sm mb-4 max-w-[80%]">
                        You're just {lestScore} XP away from your next booster pack reward.
                    </p>
                    <Link to={'/prize'}>
                        <button className="bg-white text-primary px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm active:opacity-90">
                            View My Progress
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default HeroSection;