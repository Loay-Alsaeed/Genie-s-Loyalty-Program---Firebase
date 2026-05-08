import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { Icon } from "@iconify/react";
import { deleteDoc, doc } from "firebase/firestore";
import { runTransaction } from "firebase/firestore";

const EventsSection = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [userBookings, setUserBookings] = useState({});
  const [bookingModal, setBookingModal] = useState({
    open: false,
    event: null,
  });
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, orderBy("dateTime", "asc"));
        const snapshot = await getDocs(q);
  
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
  
        setEvents(list);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    const fetchUserBookings = async () => {
      if (!user) return;
  
      try {
        const bookingsRef = collection(db, "eventBookings");
        const snapshot = await getDocs(bookingsRef);
  
        const map = {};
  
        snapshot.forEach((doc) => {
          const data = doc.data();
  
          if (data.userId === user.uid) {
            map[data.eventId] = doc.id;
          }
        });
  
        setUserBookings(map);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    const loadData = async () => {
      await fetchEvents();
      await fetchUserBookings();
      setLoading(false);
    };
  
    loadData();
  }, [user]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, orderBy("dateTime", "asc"));
        const snapshot = await getDocs(q);
        const list = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setEvents(list);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const openBooking = (event) => {
    if (userBookings[event.id]) {
      setNotification("You already booked this event.");
      return;
    }
  
    setBookingModal({ open: true, event });
    setBookingForm({
      name: user?.displayName || "",
      phone: user?.phone || "",
    });
  };

  const closeBooking = () => {
    if (bookingLoading) return;
    setBookingModal({ open: false, event: null });
    setBookingForm({ name: "", phone: "" });
    setNotification("");
  };
  const cancelBooking = async (eventId) => {
    const bookingId = userBookings[eventId];
    if (!bookingId) return;
  
    setCancelLoading(eventId);
    try {
      const eventRef = doc(db, "events", eventId);
      const bookingRef = doc(db, "eventBookings", bookingId);
  
      await runTransaction(db, async (transaction) => {
        const eventDoc = await transaction.get(eventRef);
        if (!eventDoc.exists()) throw "Event missing";
        const currentSlots = eventDoc.data().availableSlots || 0;
        transaction.update(eventRef, {
          availableSlots: currentSlots + 1,
        });
  
        transaction.delete(bookingRef);
      });
  
      setUserBookings((prev) => {
        const updated = { ...prev };
        delete updated[eventId];
        return updated;
      });
  
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === eventId
            ? { ...ev, availableSlots: ev.availableSlots + 1 }
            : ev
        )
      );
  
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      setCancelLoading(null);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingModal.event) return;
  
    setBookingLoading(true);
    setNotification("");
    try {
      const eventRef = doc(db, "events", bookingModal.event.id);
      const bookingId = await runTransaction(db, async (transaction) => {
        const eventDoc = await transaction.get(eventRef);
        if (!eventDoc.exists()) {
          throw "Event does not exist!";
        }
        const currentSlots = eventDoc.data().availableSlots;
        if (currentSlots <= 0) {
          throw "No slots available";
        }
        transaction.update(eventRef, {
          availableSlots: currentSlots - 1,
        });
        const newBookingRef = doc(collection(db, "eventBookings"));
        transaction.set(newBookingRef, {
          eventId: bookingModal.event.id,
          eventTitle: bookingModal.event.title || bookingModal.event.name,
          userId: user?.uid || null,
          name: bookingForm.name,
          phone: bookingForm.phone,
          createdAt: new Date().toISOString(),
        });
  
        return newBookingRef.id;
      });
  
      setUserBookings((prev) => ({
        ...prev,
        [bookingModal.event.id]: bookingId,
      }));
  
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === bookingModal.event.id
            ? { ...ev, availableSlots: ev.availableSlots - 1 }
            : ev
        )
      );
  
      setNotification("Booking submitted successfully!");
  
      setTimeout(() => {
        closeBooking();
      }, 1200);
  
    } catch (error) {
      console.error(error);
      setNotification(error || "Error saving booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4 gap-3">
          <h3 className="text-lg font-bold font-heading text-foreground">Upcoming Tournaments & Events ( <span className="text-primary">{events.length}</span> )</h3>
          {events.length > 2 && (
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="text-foreground text-sm font-medium flex items-center gap-2 cursor-pointer"
            >
              {showAll ? "Show Less" : "Show All"}{" "}
              <Icon icon={showAll ? "simple-line-icons:arrow-up" : "simple-line-icons:arrow-down"} className="size-4 text-primary"/>
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
            {(showAll ? events : events.slice(0, 2)).map((event) => (
              <div key={event.id} className="flex flex-col  p-4 rounded-xl bg-card border border-primary">
                <div className="flex gap-4 mb-4">

                  <div className="w-20 h-20 rounded-2xl bg-primary/10 shrink-0 overflow-hidden flex items-center justify-center">
                    {event.imageUrl ? (
                      <img alt={event.title || "Event"} src={event.imageUrl} className="w-full h-full object-cover"/>
                    ) : (
                      <Icon icon="solar:calendar-bold" className="size-8 text-primary" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>

                        <h4 className="font-bold text-base text-foreground">
                          {event.title || "Untitled Event"}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {event.description || "No description available."}
                        </p>
                      </div>
                    </div>
                    
                  </div>

                  <div className="flex items-center">
                    {userBookings[event.id] ? (
                      <button
                        onClick={() => cancelBooking(event.id)}
                        disabled={cancelLoading === event.id}
                        className={`px-4 py-2 bg-red-500 text-background rounded-lg text-xs font-semibold hover:opacity-90 disabled:opacity-50 ${cancelLoading === event.id ? "cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        {cancelLoading === event.id ? "Cancelling..." : "Cancel booking"}
                      </button>
                    ) : (
                      <button
                        onClick={() => openBooking(event)}
                        className="px-4 py-2 bg-primary text-background rounded-lg text-xs font-semibold hover:opacity-90 cursor-pointer"
                      >
                        Book a spot
                      </button>
                    )}
                </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground w-full">
                    <div className="flex items-center gap-1">
                      <Icon icon="solar:map-point-bold" className="size-4 text-emerald-400" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon icon="solar:calendar-bold" className="size-4 text-amber-400" />
                      <span>{event.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon icon="solar:users-group-rounded-bold" className="size-4 text-sky-400" />
                      <span>
                        {typeof event.availableSlots === "number"
                          ? `${event.availableSlots} available slots`
                          : "Slots not set"}
                      </span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {bookingModal.open && bookingModal.event && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-card rounded-2xl p-6 max-w-md w-full border border-border shadow-lg">
            <h3 className="text-lg font-bold font-heading mb-2 text-primary">
              {bookingModal.event.title || "Event"}
            </h3>
            <p className="text-xs text-foreground mb-4">
              Fill in your details to reserve a spot for this tournament or event.
            </p>
            <form onSubmit={handleBookingSubmit} className="space-y-3">
              <div>
                <label className="block mb-1 text-xs font-semibold text-foreground">Full Name</label>
                <input
                  type="text"
                  value={bookingForm.name}
                  onChange={(e) =>
                    setBookingForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-xs font-semibold text-foreground">Phone Number</label>
                <input
                  type="tel"
                  value={bookingForm.phone}
                  onChange={(e) =>
                    setBookingForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-lg bg-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  required
                />
              </div>

              {notification && (
                <p className="text-xs text-center text-muted-foreground">{notification}</p>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="flex-1 px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm font-semibold"
                >
                  {bookingLoading ? "Submitting..." : "Confirm Booking"}
                </button>
                <button
                  type="button"
                  onClick={closeBooking}
                  className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-80 transition-colors text-sm font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EventsSection;

