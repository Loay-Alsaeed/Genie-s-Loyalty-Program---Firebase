import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Header from "../Components/Header";

/**
 * Genie Loyalty Program Overview Page
 *
 * UI improvements (SaaS dashboard feel, without changing site palette):
 * - Consistent card system with subtle shadows + hover transitions
 * - Section headers with icon indicators (instead of emojis)
 * - Badge-style highlights for key values
 * - Cleaner tables with sticky-like header styling and soft separators
 * - Responsive grid: 1 column on mobile, 2 columns on md+, featured wide card on rewards
 * - RTL layout support + improved typography and spacing
 */

const Pill = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full border border-border/60 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary ${className}`}
  >
    {children}
  </span>
);

const Highlight = ({ children, tone = "primary" }) => {
  const tones = {
    primary: "text-primary font-semibold",
    success: "text-emerald-600 dark:text-emerald-400 font-semibold",
    default: "font-semibold text-foreground",
  };
  return <span className={tones[tone] || tones.primary}>{children}</span>;
};

const SectionCard = ({ icon, title, children, className = "" }) => (
  <div
    className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-background/70 p-5 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${className}`}
  >
    <div className="absolute inset-0 bg-linear-to-br from-primary/4 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/15">
          <Icon icon={icon} className="size-5" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base md:text-lg font-semibold leading-snug">
            {title}
          </h3>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-sm md:text-base leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

const DataTable = ({ headers, rows }) => (
  <div className="overflow-hidden rounded-xl border border-border/60 bg-background/40">
    <table className="w-full text-xs md:text-sm">
      <thead className="bg-primary/5 ">
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="px-3 py-2 text-center font-semibold text-muted-foreground"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            className="border-t border-border/60 transition-colors hover:bg-muted/25"
          >
            {row.map((cell, j) => (
              <td key={j} className="px-3 py-2 text-center">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const LoyaltyProgram = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-background text-foreground m-auto">
        <div className=" px-5 pb-10">
          {/* <Header /> */}

          <div className="flex items-center justify-start gap-4 mt-6">
              <Link to={"/dashboard"} className="size-9 rounded-full bg-white/20 text-foreground flex items-center justify-center">
                  <Icon icon="solar:arrow-left-linear" className="size-5" />
              </Link>
              <h1 className="text-md font-bold font-heading">Genie Loyalty Program Overview</h1>
             
          </div>


          {/* Page header */}
          <section className="mt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  {/* <div className="flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                      <Icon icon="solar:medal-ribbon-star-bold" className="size-6" />
                    </div>
                    <Pill className="bg-secondary/20 text-foreground border-border/60">
                      Loyalty Program
                    </Pill>
                  </div> */}
                  {/* <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tight">
                    Genie Loyalty Program Overview
                  </h1> */}
                  <p className="text-sm md:text-base text-muted-foreground max-w-3xl">
                    Collect Genie Points and redeem them for rewards in our store! Learn how to earn points through
                    purchases, events, and tournaments—and climb the monthly and yearly leaderboards.
                  </p>
                </div>

                {/* <div className="flex items-center gap-2 ">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <Icon icon="solar:arrow-left-outline" 
                    className="size-5" />
                    Back to Home
                  </Link>
                </div> */}
              </div>

              {/* KPI widgets */}
              {/* <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-background/60 px-4 py-3 shadow-sm">
                  <p className="text-xs text-muted-foreground">Purchase Rate</p>
                  <p className="mt-1 text-sm md:text-base font-semibold">
                    1 JOD = <Highlight>5 points</Highlight>
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/60 px-4 py-3 shadow-sm">
                  <p className="text-xs text-muted-foreground">Ways to Earn</p>
                  <p className="mt-1 text-sm md:text-base font-semibold">
                    Purchases &amp; <Highlight>Events</Highlight>
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/60 px-4 py-3 shadow-sm sm:col-span-2 lg:col-span-1">
                  <p className="text-xs text-muted-foreground">Leaderboards</p>
                  <p className="mt-1 text-sm md:text-base font-semibold">
                    Monthly &amp; <Highlight>Yearly</Highlight> rewards
                  </p>
                </div>
              </div> */}
          </section>

              {/* Cards grid */}
              <section className="mt-8">
            <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
              <SectionCard icon="ph:coins-bold" title="Genie Points" className="md:col-span-2">
                <p>
                  Collect Genie Points and redeem them for rewards in our store!
                </p>
                <p className="font-semibold text-foreground">There are 2 ways to earn Genie Points:</p>

                <div className="grid gap-4 pt-1 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-muted/20 px-4 py-3 space-y-2">
                    <p className="font-semibold text-foreground">1. Buy Games</p>
                    <p className="text-sm text-muted-foreground">
                      Every purchase you make at Board Games Genie earns you Genie Points. The more you shop, the more
                      points you collect, bringing you closer to exciting rewards and exclusive bonuses.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/20 px-4 py-3 space-y-2">
                    <p className="font-semibold text-foreground">2. Join Our Events &amp; Tournaments</p>
                    <p className="text-sm text-muted-foreground">
                      Take part in our events and tournaments to earn Genie Points while having fun. Whether you join,
                      compete, or achieve great results, you&apos;ll be rewarded for being an active member of our community.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 space-y-2">
                  <p>
                    💡 No matter how you earn your points, they all count toward our monthly and yearly leaderboards!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Every month and every year, the players with the most Genie Points receive bonus points and exclusive
                    rewards, so every point you earn gets you one step closer to becoming a{" "}
                    <Highlight>Genie Champion</Highlight>.
                  </p>
                </div>
              </SectionCard>

              <SectionCard icon="solar:bag-bold" title="Earning Points Through Purchases" className="md:col-span-2">
                <p>
                  Every purchase at Board Game Genie earns you Genie Points.
                </p>
                <p>
                  For every <Highlight>1 JOD</Highlight> you spend, you&apos;ll receive Genie Points that are automatically
                  added to your account. The more you shop, the more points you collect, which you can later redeem for
                  store rewards.
                </p>

                <div className="pt-1">
                  <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground">
                    Points are earned as follows:
                  </p>
                  <DataTable
                    headers={["Spends", "Points Earned"]}
                    rows={[
                      ["1 JOD", "5 Points"],
                      ["10 JOD", "50 Points"],
                      ["20 JOD", "100 Points"],
                      ["50 JOD", "250 Points"],
                    ]}
                  />
                </div>

                <p>
                  To reward our regular customers, we also offer monthly spending bonuses. If you spend{" "}
                  <Highlight tone="default">50 JOD or more in a month</Highlight>, you&apos;ll receive extra bonus points.
                  Keep your streak going each month to unlock even bigger bonuses!
                </p>

                <DataTable
                  headers={["Consecutive Month", "Bonus Points"]}
                  rows={[
                    ["Month 1", "+150 Points"],
                    ["Month 2", "+250 Points"],
                    ["Month 3", "+400 Points"],
                    ["Month 4+", "+500 Points every month"],
                  ]}
                />
              </SectionCard>

              <SectionCard icon="ph:trophy-bold" title="Earning Points Through Events & Tournaments" className="md:col-span-2">
                <p>
                  Joining our events and tournaments is another great way to earn Genie Points while having fun with the
                  community.
                </p>
                <p>
                  You&apos;ll earn points simply for participating, and you can collect even more by winning matches,
                  placing in the top rankings, or inviting new players to join us. The more active you are, the more Genie
                  Points you&apos;ll earn!
                </p>

                <div className="pt-1">
                  <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground">
                    Points are earned as follows:
                  </p>
                  <DataTable
                    headers={["Achievement", "Points"]}
                    rows={[
                      ["Participation", "30 Points"],
                      ["Round Win", "25 Points"],
                      ["3rd Place", "100 Points"],
                      ["2nd Place", "200 Points"],
                      ["1st Place", "300 Points"],
                    ]}
                  />
                </div>
              </SectionCard>
              <SectionCard icon="ph:trophy-bold" title="Earning Points Through Referrals" className="md:col-span-2">
                <p>
                  Referral bonus is awarded only if your friends is attending <Highlight>Board Games Genie</Highlight> for the first time and purchases a membership.
                </p>
                <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground">
                  Points are earned as follows:
                </p>
                <div className="pt-1">
                  <DataTable
                    headers={["Achievement", "Points"]}
                    rows={[
                      ["Participation", "50 Points"],
                      ["Bring a New Friend", "150 Points"],
                     
                    ]}
                  />
                </div>
              </SectionCard>
              <SectionCard icon="solar:medal-ribbons-star-bold" title="Monthly Top Player Reward">
                <p>At the end of each month, the player with the highest points receives:</p>
                <ul className="space-y-1.5 pr-4 pt-1 text-sm md:text-base">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary/60" />
                    <Highlight>+500 points</Highlight> bonus
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary/60" />
                    <span>
                      Their name displayed on the <Highlight>Genie Champion</Highlight> board
                    </span>
                  </li>
                </ul>
              </SectionCard>

              <SectionCard icon="solar:crown-bold" title="Yearly Top Player Reward">
                <p>At the end of the year, the player with the most points receives:</p>
                <ul className="space-y-1.5 pr-4 pt-1 text-sm md:text-base">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary/60" />
                    <Highlight>+2500 points</Highlight>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary/60" />
                    Free membership for one year
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary/60" />
                    Trophy + shout‑out on social media
                  </li>
                </ul>
              </SectionCard>
             
            </div>
            
            
          </section>
        </div>
      </div>
    </>
  );
};

export default LoyaltyProgram;

