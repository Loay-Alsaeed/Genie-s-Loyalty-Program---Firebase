import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";


const BattleBase = () => {
    const { user, prizes } = useAuth();
    const [prizesList, setPrizesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/auth");
        }
    }, [user, navigate]);

    useEffect(() => {
        setPrizesList(prizes);
    }, [prizes]);

    // useEffect(() => {
    //     const fetchPrizes = async () => {
    //         try {
    //             const prizesRef = collection(db, "prizes");
    //             const q = query(prizesRef, orderBy("score", "asc"));
    //             const snapshot = await getDocs(q);
    //             const list = [];
    //             snapshot.forEach((doc) => {
    //                 list.push({
    //                     id: doc.id,
    //                     ...doc.data()
    //                 });
    //             });
    //             setPrizes(list);
    //         } catch (error) {
    //             console.error("Error fetching prizes:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchPrizes();
    // }, []);

    return (
        <section className="max-w-5xl m-auto flex flex-col min-h-screen bg-background text-foreground font-sans ">
            <div className="pt-12 px-5 pb-4 bg-linear-to-b from-primary/10 to-background">
                <div className="flex items-center justify-between mb-6">
                    <Link to={"/"} className="size-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Icon icon="solar:arrow-left-linear" className="size-6" />
                    </Link>
                    <h1 className="text-xl font-bold font-heading">Prizes</h1>
                    <div className="size-10" />
                </div>
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary to-primary/80 p-5 shadow-lg shadow-primary/20">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl" />
                    <div className="relative z-10">
                        <p className="text-white/80 text-sm mb-1">Your Points Balance</p>
                        <div className="flex items-center gap-2">
                            <Icon icon="solar:crown-star-bold" className="size-8 text-white" />
                            <h2 className="text-4xl font-bold text-white font-heading">{user?.score || 0}</h2>
                            <span className="text-white/90 text-lg font-medium">XP</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* prizes  */}

            <div className="px-5 pb-6">
                {prizes === 0 && (
                    <div className="mb-4">
                        <p className="text-sm text-muted-foreground">Redeem your points for exclusive rewards</p>
                    </div>
                )}
                <div className="space-y-4">
                    {prizes.length === 0 ?
                        (
                            <div className="flex justify-center items-center p-12">
                                <p className="text-sm text-muted-foreground">There No Prizes</p>
                            </div>
                        ) :

                        prizes.map(prize =>
                            user.score >= prize.score ?
                                (
                                    <div key={prize.id} className="p-4 rounded-2xl bg-card border-2 border-primary shadow-md shadow-primary/20">
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 rounded-xl bg-primary/10 shrink-0 flex items-center justify-center">
                                                <img className="rounded-xl" src={prize.imageUrl} alt={prize.name} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-bold text-base">{prize.name}</h3>
                                                        <p className="text-xs text-muted-foreground mt-0.5">
                                                            {prize.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                                                        <Icon icon="solar:star-bold" className="size-4" />
                                                        <span>{prize.score} pts</span>
                                                    </div>
                                                    <button className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm active:opacity-90">
                                                        Redeem
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) :
                                (<div key={prize.id} className="p-4 rounded-2xl bg-card border border-border opacity-60">
                                    <div className="flex gap-4">
                                        <div className="w-20 h-20 rounded-xl bg-indigo-500/10 shrink-0 flex items-center justify-center">
                                            {/* <Icon icon="solar:diploma-bold" className="size-10 text-indigo-500" /> */}
                                            <img className="rounded-xl" src={prize.imageUrl} alt={prize.name} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="font-bold text-base">{prize.name}</h3>
                                                    <p className="text-xs text-muted-foreground mt-0.5">
                                                        {prize.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground font-bold text-sm">
                                                    <Icon icon="solar:star-bold" className="size-4" />
                                                    <span>{prize.score} pts</span>
                                                </div>
                                                <div className="px-4 py-1.5 text-muted-foreground font-semibold text-sm">
                                                    Locked
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                        )}
                </div>
            </div>
        </section>
    )
}
export default BattleBase;