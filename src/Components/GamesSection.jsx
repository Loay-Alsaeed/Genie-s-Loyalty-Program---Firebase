import React from "react";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const GamesSection = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const gamesRef = collection(db, "games");
                const q = query(gamesRef, orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const gamesList = [];

                querySnapshot.forEach((doc) => {
                    gamesList.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                setGames(gamesList);
            } catch (error) {
                console.error("Error fetching games:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    return (
        <>
            <div className=" mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold font-heading">Available Games</h3>
                    {games.length > 2 && (
                        <button
                            onClick={() => setShowAll((prev) => !prev)}
                            className=" text-primary text-sm font-medium flex items-center gap-2 cursor-pointer"
                        >
                            {showAll ? "See Less" : "See All"} <Icon icon={showAll? "simple-line-icons:arrow-up" : "simple-line-icons:arrow-down"} className="size-3" />
                        </button>
                    )}
                </div>
                

                {loading ? (
                    <div className="w-full text-center py-12">
                        <p className="text-purple-300 text-xl font-medium">Loading games...</p>
                    </div>
                ) : games.length === 0 ? (
                    <div className="w-full text-center py-12">
                        <p className="text-purple-300 text-xl font-medium">No games available at the moment</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {(showAll ? games : games.slice(0, 2)).map(game => (
                            <div key={game.id} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                                <div className="w-20 h-20 rounded-2xl bg-indigo-900/50 shrink-0 overflow-hidden">
                                    <img
                                        alt="Magic"
                                        src={game.imageUrl || game.imagePath}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-bold text-base">{game.name}</h4>
                                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                {game.description || "No description available."}
                                            </p>
                                        </div>
                                        <div className="bg-primary/10 p-1.5 rounded-lg">
                                            <Icon icon="solar:bookmark-linear" className="size-5 text-primary" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mt-3">
                                        {/* <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                            <Icon icon="solar:users-group-rounded-bold" className="size-4 text-emerald-400" />
                                            <span>45 Active</span>
                                        </div> */}
                                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                            <Icon icon="solar:calendar-bold" className="size-4 text-amber-400" />
                                            <span>{game.schedule || "Schedule TBD"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
export default GamesSection;