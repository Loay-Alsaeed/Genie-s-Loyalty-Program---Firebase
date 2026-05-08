import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import GamesSection from "../Components/GamesSection";
import EventsSection from "../Components/EventsSection";
import ScorePoints from "../Components/ScorePoints";
import LoyalityProgramCard from "../Components/LoyalityProgramCard";
import LoyaltyMember from "../Components/LoyaltyMember";

const Customer = () => {

    return(
        <>
            <div className="flex flex-col min-h-screen bg-background text-background max-w-5xl m-auto">
                <div className="pt-2 px-5 pb-6 ">
                    <Header/>
                    <HeroSection/>
                    <LoyaltyMember/>
                    <LoyalityProgramCard/>
                    <GamesSection/>
                    <EventsSection/>
                    {/* <ScorePoints/> */}
                </div>
            </div>
        </>
    )
}
export default Customer;