import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventData } from "../utils/types";
import EventBox from "../Components.tsx/EventBox";

function CategoryPage() {
  const { categoryName } = useParams();
  const [eventList, setEventList] = useState<Array<EventData>>([]);

  useEffect(() => {
    (async function getEventByCategories() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/events?category_like=${categoryName}`
        );
        const events = await response.json();
        setEventList(events);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [categoryName]);
  return (
    <div className="sm:mx-6 mt-4">
      <h1 className="text-3xl ">Upcoming {categoryName} Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 justify-items-center mt-4">
          {eventList?.map((event: EventData) => (
            <EventBox event={event} key={event.id} />
          ))}
        </div>
    </div>
  );
}

export default CategoryPage;
