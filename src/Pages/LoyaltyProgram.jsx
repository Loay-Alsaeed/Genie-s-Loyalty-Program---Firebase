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
                    This page explains the full rules of the Genie Loyalty Program—how you earn points, rewards, vouchers,
                    and the benefits of membership.
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
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-background/60 px-4 py-3 shadow-sm">
                  <p className="text-xs text-muted-foreground">Points Value</p>
                  <p className="mt-1 text-sm md:text-base font-semibold">
                    1 JOD = <Highlight>100 points</Highlight>
                  </p>
                </div>
                {/* <div className="rounded-2xl border border-border/60 bg-background/60 px-4 py-3 shadow-sm">
                  <p className="text-xs text-muted-foreground">بطولات شهرية</p>
                  <p className="mt-1 text-sm md:text-base font-semibold">
                    تقريبًا <Highlight>6</Highlight> بطولات
                  </p>
                </div> */}
                <div className="rounded-2xl border border-border/60 bg-background/60 px-4 py-3 shadow-sm">
                  <p className="text-xs text-muted-foreground">Redemption</p>
                  <p className="mt-1 text-sm md:text-base font-semibold">
                  <Highlight>100 points</Highlight> = 1 JOD store credit                  </p>
                </div>
              </div>
          </section>

              {/* Cards grid */}
              <section className="mt-8">
            <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
              <SectionCard icon="ph:coins-bold" title="Points System (Genie Points)">
                <p>
                  Every <Highlight>1 JOD</Highlight> spent equals <Highlight>100 points</Highlight>.
                </p>
                <p>
                  Redemption: <Highlight>100 points = 1 JOD</Highlight> store credit.
                </p>
                <p className="text-muted-foreground text-sm">
                  The goal is to make calculations easy and motivate players to keep playing and spending.
                </p>
              </SectionCard>

              <SectionCard icon="ph:trophy-bold" title="Tournament Points">
                <p>There are around 6 tournaments every month.</p>
                <div className="grid gap-4 pt-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                      Registration fees
                    </p>
                    <ul className="space-y-1.5 pr-4 text-sm md:text-base">
                      <li className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-primary/60" />
                        Members: <Highlight tone="success">Free</Highlight>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-primary/60" />
                        Non‑members: <Highlight tone="default">3 JOD</Highlight>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                      Points earned
                    </p>
                    <ul className="space-y-1.5 pr-4 text-sm md:text-base">
                      <li className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-primary/60" />
                        Participation: <Highlight tone="default">20 points</Highlight>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-primary/60" />
                        Round win: <Highlight tone="default">15 points</Highlight>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-primary/60" />
                        3rd place: <Highlight tone="default">100 points</Highlight>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-primary/60" />
                        2nd place: <Highlight tone="default">200 points</Highlight>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-primary/60" />
                        1st place: <Highlight tone="default">300 points</Highlight>
                      </li>
                    </ul>
                  </div>
                </div>
              </SectionCard>

              <SectionCard icon="solar:calendar-bold" title="Event Points">
                <p>About 5 events are held every month.</p>
                <ul className="space-y-1.5 pr-4 pt-1 text-sm md:text-base">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary/60" />
                    Event participation: <Highlight tone="default">40 points</Highlight>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary/60" />
                    Bringing a new friend: <Highlight tone="default">50 points</Highlight>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary/60" />
                    If the friend becomes a member: <Highlight>+200 points</Highlight>
                  </li>
                </ul>
                <p className="rounded-xl border border-border/60 bg-muted/20 px-3 py-2 text-xs md:text-sm text-muted-foreground">
                  Referral bonus is only given if the friend has never joined any previous event or tournament.
                </p>
              </SectionCard>

              <SectionCard icon="solar:bag-bold" title="Purchase Points">
                <p>
                  Every <Highlight tone="default">1 JOD</Highlight> spent in store earns{" "}
                  <Highlight tone="default">5 points</Highlight>.
                </p>
                <div className="pt-1">
                  <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground">
                    Examples
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-xl border border-border/60 bg-muted/20 px-3 py-2 text-sm">
                      Spend 20 JOD → <Highlight tone="default">100 points</Highlight>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-muted/20 px-3 py-2 text-sm">
                      Spend 50 JOD → <Highlight tone="default">250 points</Highlight>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard icon="solar:fire-bold" title="Monthly Purchase Streak">
                <p>
                  If a customer spends <Highlight tone="default">50 JOD or more in a month</Highlight>, a streak starts
                  and they receive monthly bonus points as long as they maintain it.
                </p>
                <DataTable
                  headers={["Month", "Bonus"]}
                  rows={[
                    ["Month 1", "+100 points"],
                    ["Month 2", "+200 points"],
                    ["Month 3", "+300 points"],
                    ["Month 4+", "+400 points"],
                  ]}
                />
                <p className="rounded-xl border border-border/60 bg-muted/20 px-3 py-2 text-xs md:text-sm text-muted-foreground">
                  If spending drops below 50 JOD in any month, the streak is broken and restarts from month 1.
                </p>
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
                    Their name displayed on the <Highlight>Genie Champion</Highlight> board
                  </li>
                </ul>
              </SectionCard>

              <SectionCard icon="solar:crown-bold" title="Yearly Top Player Reward">
                <p>At the end of the year, the player with the most points receives:</p>
                <ul className="space-y-1.5 pr-4 pt-1 text-sm md:text-base">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary/60" />
                    <Highlight>+2000 points</Highlight>
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

              <SectionCard icon="solar:card-bold" title="Membership System">
                <p>
                  Membership price: <Highlight tone="default">10 JOD per month</Highlight>.
                </p>
                <div className="grid gap-4 pt-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                      Membership benefits
                    </p>
                    <ul className="space-y-1.5 pr-4 text-sm md:text-base">
                      <li className="flex items-start gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
                        Free access to all tournaments and events
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
                        10% discount in the store
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
                        +10% extra points on everything
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
                        Members‑only tournaments
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                      Membership points example
                    </p>
                    <div className="rounded-xl border border-border/60 bg-muted/20 px-3 py-2 text-sm">
                      Spend 50 JOD = 250 base points + 25 membership bonus (10%) ={" "}
                      <Highlight>275 points</Highlight>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard
                icon="solar:gift-bold"
                title="Points Redemption System (Rewards)"
                className="md:col-span-2"
              >
                <p>Players can redeem their points for in‑store vouchers:</p>
                <DataTable
                  headers={["Points", "Reward"]}
                  rows={[
                    ["500 points", "5 JOD voucher"],
                    ["1000 points", "10 JOD voucher"],
                    ["2000 points", "25 JOD voucher"],
                    ["3000 points", "40 JOD voucher"],
                    ["5000 points", "75 JOD voucher"],
                  ]}
                />
                <p className="rounded-xl border border-border/60 bg-muted/20 px-3 py-2 text-xs md:text-sm text-muted-foreground">
                  The more points a player collects, the better the voucher value they can redeem, encouraging continuous play and spending.
                </p>
              </SectionCard>
            </div>

            {/* <div className="mt-8 rounded-2xl border border-dashed border-border/60 bg-muted/15 px-5 py-4 text-center text-sm text-muted-foreground">
              This overview can later be connected to a live dashboard for tracking points, tournaments, events, purchases,
              streaks, and leaderboards in real time.
            </div> */}
          </section>
        </div>
      </div>
    </>
  );
};

export default LoyaltyProgram;

