import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Icon } from "@iconify/react";
import { db } from "../firebase";
import { sortEventsBySerial } from "../utils/sortEvents";
import { FcMoneyTransfer } from "react-icons/fc";


const PublicEventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, "events");
        const snapshot = await getDocs(eventsRef);
        const list = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() });
        });
        setEvents(sortEventsBySerial(list));
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h3 className="text-lg font-bold font-heading text-foreground">
          Upcoming Events
          <span className="text-primary ml-2">({events.length})</span>
        </h3>
        {events.length > 2 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-foreground text-sm font-medium flex items-center gap-2 cursor-pointer"
          >
            {showAll ? "Show Less" : "Show All"}
            <Icon
              icon={showAll ? "simple-line-icons:arrow-up" : "simple-line-icons:arrow-down"}
              className="size-3 text-primary"
            />
          </button>
        )}
      </div>

      {loading ? (
        <div className="w-full text-center py-12">
          <p className="text-muted-foreground text-sm">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="w-full text-center py-12">
          <p className="text-muted-foreground text-sm">No events available at the moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {(showAll ? events : events.slice(0, 3)).map((event) => (
            <div key={event.id} className="flex flex-col p-4 rounded-xl bg-card border border-border">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 shrink-0 overflow-hidden flex items-center justify-center">
                  {event.imageUrl ? (
                    <img alt={event.title || "Event"} src={event.imageUrl} className="w-full h-full object-cover" />
                  ) : (
                    <Icon icon="solar:calendar-bold" className="size-8 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base text-foreground">{event.title || "Untitled Event"}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {event.description || "No description available."}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground mt-4">
                <div className="flex items-center gap-1">
                  <Icon icon="solar:map-point-bold" className="size-4 text-emerald-400" />
                  <span>{event.location || "Location TBA"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="solar:calendar-bold" className="size-4 text-amber-400" />
                  <span>{event.dateTime || "Date/Time TBA"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="solar:users-group-rounded-bold" className="size-4 text-sky-400" />
                  <span>
                    {typeof event.availableSlots === "number"
                      ? `${event.availableSlots} slots`
                      : "Slots not set"}
                  </span>
                </div>
                {event.entryFee && (
                      <div className="flex items-center gap-1.5">
                        <FcMoneyTransfer className="size-4 text-amber-400" />
                        <span>{event.entryFee || "0"} JD</span>
                      </div>
                    )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PublicEventsSection;
