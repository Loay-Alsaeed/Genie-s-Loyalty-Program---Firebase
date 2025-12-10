import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Icon } from "@iconify/react";


const LeaderBoard = () => {
    const { usersScore, user } = useAuth();
    const [sortedUsers, setSortedUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/auth");
        }
    }, [user, navigate]);

    useEffect(() => {
        setSortedUsers([...usersScore].sort((a, b) => (b.score || 0) - (a.score || 0)));
    }, [usersScore]);



    return (

        <section className="max-w-5xl m-auto flex flex-col min-h-screen bg-background text-foreground font-sans ">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <Link to={"/"} className="flex items-center justify-center size-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors active:scale-95">
                    <Icon icon="solar:arrow-left-linear" className="size-6" />
                </Link>
                <h1 className="text-xl font-bold font-heading">Leaderboard</h1>
                <div className="size-10" />
            </div>

            {sortedUsers.length === 0 ? (<>Loading</>) :
                (<>
                    {/* top 3 */}
                    <div className="px-5 pt-8 pb-6">
                        <div className="flex items-end justify-center gap-4 mb-8">
                            <div className="flex flex-col items-center flex-1">
                                <div className="relative mb-3">
                                    <div className="size-16 rounded-full overflow-hidden border-4 border-border">
                                        <img
                                            alt="2nd place"
                                            src={sortedUsers[1].imageUrl || "https://randomuser.me/api/portraits/lego/2.jpg"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 size-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center border-2 border-background shadow-lg">
                                        <Icon icon="solar:crown-star-bold" className="size-4 text-white" />
                                    </div>
                                </div>
                                <div className="text-center mb-2">
                                    <p className="font-bold text-sm">{sortedUsers[1].name}</p>
                                    {/* <p className="text-xs text-muted-foreground">{sortedUsers[1].email}</p> */}
                                </div>
                                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-slate-500/20 to-slate-600/20 border border-slate-500/30">
                                    <p className="text-lg font-bold text-slate-300">{sortedUsers[1].score}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center flex-1 -mt-4">
                                <div className="relative mb-3">
                                    <div className="size-20 rounded-full overflow-hidden border-4 border-amber-400 shadow-lg shadow-amber-500/50">
                                        <img
                                            alt="1st place"
                                            src={sortedUsers[0].imageUrl || "https://randomuser.me/api/portraits/lego/2.jpg"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 size-8 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center border-2 border-background shadow-lg">
                                        <Icon icon="solar:crown-star-bold" className="size-5 text-white" />
                                    </div>
                                </div>
                                <div className="text-center mb-2">
                                    <p className="font-bold text-base">{sortedUsers[0].name}</p>
                                    {/* <p className="text-xs text-muted-foreground">{sortedUsers[0].email}</p> */}
                                </div>
                                <div className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 shadow-lg shadow-amber-500/20">
                                    <p className="text-xl font-bold text-amber-400">{sortedUsers[0].score}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <div className="relative mb-3">
                                    <div className="size-16 rounded-full overflow-hidden border-4 border-border">
                                        <img
                                            alt="3rd place"
                                            src={sortedUsers[2].imageUrl || "https://randomuser.me/api/portraits/lego/2.jpg"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 size-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center border-2 border-background shadow-lg">
                                        <Icon icon="solar:crown-star-bold" className="size-4 text-white" />
                                    </div>
                                </div>
                                <div className="text-center mb-2">
                                    <p className="font-bold text-sm">{sortedUsers[2].name}</p>
                                    {/* <p className="text-xs text-muted-foreground">{sortedUsers[2].email}</p> */}
                                </div>
                                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-600/20 to-orange-700/20 border border-orange-600/30">
                                    <p className="text-lg font-bold text-orange-400">{sortedUsers[2].score}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)}

            {/* rest users  */}

            <div className="px-5 flex-1">
                <div className="space-y-3 pb-6">

                    {sortedUsers.length !== 0 &&
                        sortedUsers.slice(3, 10).map((player, idx) =>
                            player.id === user.uid ? (
                                <div
                                    key={player.id || player.email || idx}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-primary/10 border-2 border-primary shadow-lg shadow-primary/20"
                                >
                                    <div className="flex items-center justify-center size-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                                        {idx + 4}
                                    </div>
                                    <div className="size-12 rounded-full overflow-hidden border-2 border-primary">
                                        <img
                                            alt="You"
                                            src={player.imageUrl || "https://randomuser.me/api/portraits/lego/2.jpg"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-sm">You</p>
                                            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                                                YOU
                                            </span>
                                        </div>
                                        {/* <p className="text-xs text-muted-foreground">{player.email}</p> */}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-primary">{player.score}</p>
                                        <p className="text-xs text-muted-foreground">XP</p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={player.id || player.email || idx}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border"
                                >
                                    <div className="flex items-center justify-center size-10 rounded-full bg-secondary font-bold text-lg">
                                        {idx + 4}
                                    </div>
                                    <div className="size-12 rounded-full overflow-hidden border-2 border-border">
                                        <img
                                            alt={player.name || "player"}
                                            src={player.imageUrl || "https://randomuser.me/api/portraits/lego/2.jpg"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm">{player.name}</p>
                                        {/* <p className="text-xs text-muted-foreground">{player.email}</p> */}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-primary">{player.score}</p>
                                        <p className="text-xs text-muted-foreground">XP</p>
                                    </div>
                                </div>
                            )
                        )
                    }

                </div>
            </div>
        </section>
    );
};

export default LeaderBoard;