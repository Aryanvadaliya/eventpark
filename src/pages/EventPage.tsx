import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EventData } from "../utils/types";
import moment from "moment";
import { Clock, MapPin, Calendar, Ticket } from "lucide-react";
import EventDetails from "../Components.tsx/EventDetails";

function EventPage() {
  const { id } = useParams();
  const [eventData, setEventData] = useState<EventData>();

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
        <p className="text-4xl mb-5 text-blue-500">{eventData?.name}</p>
        <div className="flex flex-wrap">
          <div className="lg:w-4/12 w-[97%]">
            <img src={eventData?.image} alt="" loading="lazy" className="event-picture " />
            <div className="shadow-md  p-4  rounded-md">
              <p className="text-slate-600">Price</p>
              <p>
                {" "}
                <span className="font-semibold">
                  &#8377; {eventData?.ticketPrice}{" "}
                </span>
                / Ticket
              </p>
            </div>
            <Link
              to={`/event/${id}/checkout`}
              state={{ from: `/event/${id}` }}
              className="bg-blue-500 block text-center w-full text-white py-2 rounded-md mt-4"
            >
              Purchase Ticket
            </Link>
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
