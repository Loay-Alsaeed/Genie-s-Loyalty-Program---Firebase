import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const HeroSection = () => {

    return (
        <section>
            <div className="grid grid-cols-2 gap-4 mb-5">
                {/* <Link to={"/prize"} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-secondary hover:bg-secondary/80 border hover:border-primary transition-all active:scale-95 group">
                    <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-background transition-colors">
                        <Icon icon="solar:gift-bold" className="size-6" />
                    </div>
                    <span className="font-semibold text-sm">Prizes</span>
                </Link> */}
                <div className="relative overflow-hidden border  rounded-2xl bg-white/20">
                    {/* <div className="absolute top-0 right-0 w-32 h-32 bg-primary/16 rounded-full -mr-10 -mt-10 blur-xl" /> */}
                    <Link to={"/prize"} className="flex flex-col items-center justify-center p-4 rounded-2xl  border hover:border-primary transition-all active:scale-95 group">
                        <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2 text-background group-hover:bg-primary group-hover:text-background transition-colors">
                        <Icon icon="solar:gift-bold" className="size-6" />
                        </div>
                        <span className="font-semibold text-white/80">Prizes</span>
                    </Link>
                </div>

                <div className="relative overflow-hidden border  rounded-2xl bg-white/20">
                    {/* <div className="absolute top-0 right-0 w-32 h-32 bg-primary/16 rounded-full -mr-10 -mt-10 blur-xl" /> */}
                    <Link to={"/leaderpoint"} className="flex flex-col items-center justify-center p-4 rounded-2xl  border hover:border-primary transition-all active:scale-95 group">
                        <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2 text-background group-hover:bg-primary group-hover:text-background transition-colors">
                            <Icon icon="solar:ranking-bold" className="size-6" />
                        </div>
                        <span className="font-semibold text-white/80">Leaderboard</span>
                    </Link>
                </div>

                    

            </div>
           
        </section>
    )
}
export default HeroSection;