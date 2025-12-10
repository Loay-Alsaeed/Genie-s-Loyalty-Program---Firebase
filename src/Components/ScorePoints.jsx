import { LiaSlideshare } from "react-icons/lia";
import { LuUsers } from "react-icons/lu";
import { GiTrophyCup } from "react-icons/gi";
import { GiPodiumWinner } from "react-icons/gi";
import { Icon } from "@iconify/react";


const ScorePoints = () => {
    return (
        <>
            <div className="">
				<h3 className="text-lg font-bold font-heading mb-4">How to Earn Points</h3>
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 rounded-2xl bg-secondary/50 border border-border flex flex-col items-center text-center">
						<div className="size-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                            <Icon icon="streamline-ultimate-color:gaming-ribbon-first" className="size-6" />
						</div>
						<h4 className="font-semibold text-sm mb-1">First Place</h4>
						<p className="text-xs text-muted-foreground">3 per first place in a game</p>
					</div>
					<div className="p-4 rounded-2xl bg-secondary/50 border border-border flex flex-col items-center text-center">
						<div className="size-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
							<Icon icon="solar:cup-first-bold" className="size-6" />
						</div>
						<h4 className="font-semibold text-sm mb-1">Round Win</h4>
						<p className="text-xs text-muted-foreground">1 XP for Win Round</p>
					</div>
					<div className="p-4 rounded-2xl bg-secondary/50 border border-border flex flex-col items-center text-center">
						<div className="size-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
							<Icon icon="solar:calendar-add-bold" className="size-6" />
						</div>
						<h4 className="font-semibold text-sm mb-1">Events</h4>
						<p className="text-xs text-muted-foreground">2 XP for Participate in an event</p>
					</div>
					<div className="p-4 rounded-2xl bg-secondary/50 border border-border flex flex-col items-center text-center">
						<div className="size-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mb-3">
							<Icon icon="solar:share-bold" className="size-6" />
						</div>
						<h4 className="font-semibold text-sm mb-1">Referrals</h4>
						<p className="text-xs text-muted-foreground">2 XP per friend</p>
					</div>
				</div>
			</div>
        </>

    )
}
export default ScorePoints;