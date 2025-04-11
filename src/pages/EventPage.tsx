import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EventData } from "../utils/types";
import moment from "moment";
import { Clock, MapPin, Calendar, Ticket, X } from "lucide-react";
import EventDetails from "../Components.tsx/EventDetails";
import { useAuth } from "../hooks/useAuth";
import EventModal from "../Components.tsx/EventModal";

function EventPage() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState<EventData>();
  const { currentUser } = useAuth();

  useEffect(() => {
    (async function getData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/events/${id}`
        );
        const eventData = await response.json();
        setEventData(eventData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <div className="sm:ms-10 ms-2 my-5 ">
        <div className="flex justify-between me-6 items-center mb-4 flex-wrap">
          <p className="text-4xl  text-blue-500">{eventData?.name}</p>
          {currentUser && currentUser.role === "admin" && (
            <div>
             
              <EventModal eventData={eventData} />

              <button className="bg-red-500 px-4 py-2 text-white rounded-lg mx-6 cursor-pointer">
                Delete Event
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap">
          <div className="lg:w-4/12 w-[97%]">
            <img
              src={eventData?.image}
              alt=""
              loading="lazy"
              className="event-picture "
            />
            <div className="shadow-md  p-4  rounded-md">
              <p className="text-slate-600">Price</p>
              <p>
                {" "}Starting from{" "}
                <span className="font-semibold">
                  &#8377; {eventData?.ticketPrice}{" "}
                </span>
                / Ticket
              </p>
            </div>
            {currentUser?.role !== "admin" && (
              <Link
                to={`/event/${id}/checkout`}
                state={{ from: `/event/${id}` }}
                className="bg-blue-500 block text-center w-full text-white py-2 rounded-md mt-4"
              >
                Purchase Ticket
              </Link>
            )}
          </div>
          <div className="lg:w-7/12 lg:ms-4 grow">
            <div className="flex flex-wrap content-start ">
              <EventDetails
                title="Date and Time"
                value={moment(eventData?.date).format("dddd, DD MMMM")}
                extraValue={moment(eventData?.date).format("LT")}
              >
                <Calendar size={32} color="#2b7fff" />
              </EventDetails>
              <EventDetails title="Location" value={eventData?.location}>
                <MapPin size={32} color="#2b7fff" />
              </EventDetails>
              <EventDetails title="Duration" value={eventData?.duration}>
                <Clock size={32} color="#2b7fff" />
              </EventDetails>
              {eventData?.isMticketAvailable && (
                <EventDetails title="M-Ticket" value={"M-Ticket Available"}>
                  <Ticket size={32} color="#2b7fff" />
                </EventDetails>
              )}
            </div>
            <div>
              <p className="text-2xl font-semibold">Description</p>
              <p>{eventData?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventPage;
