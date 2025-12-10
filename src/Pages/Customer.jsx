import React, { useState } from "react";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import GamesSection from "../Components/GamesSection";
import ScorePoints from "../Components/ScorePoints";


const Customer = () => {

    return(
        <>
            <div className="flex flex-col min-h-screen bg-background text-foreground font-sans  max-w-5xl m-auto">
                <div className="pt-4 px-5 pb-6 bg-linear-to-b from-primary/10 to-background">
                    <Header/>
                    <HeroSection/>
                    <GamesSection/>
                    <ScorePoints/>
                </div>
            </div>
        </>
    )
}
export default Customer;