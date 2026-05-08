import { Link } from "react-router-dom";
const LoyalityProgramCard = () => {
    return (
        <section className="mb-5">
            <div className="relative overflow-hidden p-5 md:p-6 border border-primary/20 hover:border-primary/40 transition-all rounded-3xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/16 rounded-full -mr-10 -mt-10 blur-xl" />
                <div className="absolute bottom-0 left-0 w-26 h-26 bg-black/14 rounded-full -ml-8 -mb-8 blur-x" />
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary w-fit mb-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Genie Loyalty Program
                    </div>
                    <h2 className="text-2xl font-bold text-white font-heading mb-1">
                        Loyalty & Points Program Details
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-2xl  mb-4">
                        Learn how you earn points from tournaments, events, and purchases, and how membership, streaks, and redemptions work.
                    </p>
                    <Link to={'/loyalty'}>
                    <button className="bg-primary text-background px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm active:opacity-90 cursor-pointer hover:bg-primary/80 transition-all">
                    View Loyalty Program
                    </button>
                </Link>
                </div>
            </div>
        </section>
    )
}
export default LoyalityProgramCard;