import { Link } from "react-router-dom";
import EventBox from "../../Components.tsx/EventBox";
import { useFetch } from "../../hooks/useFetch";
import { EventData } from "../../utils/types";
import Loader from "../../Components.tsx/Loader";
import { useState } from "react";
import { Modal } from "@mui/material";
import EventForm from "../EventForm";
import EventModal from "../../Components.tsx/EventModal";

function Dashboard() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: eventList, isLoading } = useFetch({
    endpoint: "events",
    method: "GET",
  });

  // const handleAddEventClick = () => setIsModalOpen(true);
  // const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="h-[80%] m-4">
      <div className="flex justify-between items-center">
        <p className="text-3xl inline float-end">Events</p>

        <EventModal />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 justify-items-center mt-4">
        {isLoading ? (
          <Loader />
        ) : eventList?.length ? (
          eventList.map((event: EventData) => (
            <EventBox event={event} key={event.id} />
          ))
        ) : (
          <p>No Events Found, please try later.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
