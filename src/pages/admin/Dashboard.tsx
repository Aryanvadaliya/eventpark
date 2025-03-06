import { Link } from "react-router-dom";
import EventBox from "../../Components.tsx/EventBox";
import { useFetch } from "../../hooks/useFetch";
import { EventData } from "../../utils/types";

function Dashboard() {
  const { data: eventList } = useFetch({ endpoint: "events", method: "GET" });
  return (
    <div className="h-[80%] m-4">
      <div className="flex justify-between">
      <p className="text-3xl inline float-end">Events</p>

      <Link to={'addEvent'} className="bg-blue-500 text-white text-lg px-6 py-2 rounded-md">Add Event</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 justify-items-center mt-4">
        {eventList?.length > 0 ? (
          eventList?.map((event: EventData) => (
            <EventBox event={event} key={event.id} isAdmin />
          ))
        ) : (
          <p>
            No Events Found please Try later{" "}
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
