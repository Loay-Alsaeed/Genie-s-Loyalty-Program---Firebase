import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import GamesSection from "../Components/GamesSection";
import PublicEventsSection from "../Components/PublicEventsSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-5 py-6 md:py-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src="/logo2.jpeg" alt="Genie logo" className="h-14 w-auto" />
            <div>
              <h1 className="text-xl font-bold ">Genie Loyalty Program</h1>
              <p className="text-xs text-muted-foreground">Boardgame Community Rewards</p>
            </div>
          </div>

          {/* <Link
            to="/auth"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-background font-semibold hover:opacity-90 transition-opacity"
          >
            <Icon icon="solar:login-2-bold" className="size-5" />
            Login
          </Link> */}
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-primary/30 bg-linear-to-br from-card via-card to-accent/35 p-6 md:p-10 mb-10">
          <div className="absolute -top-24 -right-20 size-56 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 size-52 rounded-full bg-accent/30 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary font-semibold mb-4">
              <Icon icon="solar:stars-bold" className="size-4" />
              Play More, Earn More
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight font-heading">
              Your Gateway to <span className="text-primary">Games</span>, <span className="text-accent-foreground">Events</span> and Rewards
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-4 max-w-2xl">
              Discover tournaments and boardgame activities, track your loyalty journey, and join a fun community experience designed around Genie&apos;s identity.
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-background font-bold hover:opacity-90 transition-opacity"
              >
                Get Started
                <Icon icon="solar:arrow-right-linear" className="size-5" />
              </Link>
              <a
                href="#overview"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card/70 text-foreground font-semibold hover:border-primary transition-colors"
              >
                Explore Available Activities
              </a>
            </div>
          </div>
        </section>

        <section id="overview">
          <div className="flex flex-wrap items-center gap-3 justify-between mb-10">
            <h3 className="text-xl font-bold font-heading">What&apos;s Available Right Now</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon icon="solar:shield-check-bold" className="size-4 text-primary" />
              Sign in to book events and manage your loyalty profile
            </div>
          </div>

          <PublicEventsSection />
          <GamesSection />
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
