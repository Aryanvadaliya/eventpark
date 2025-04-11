import { Link } from "react-router-dom";
import { EventData } from "../utils/types";
import moment from "moment";
type EventBoxProps = {
  event: EventData;
  isAdmin?: boolean;
};

function EventBox({
  event,
}:EventBoxProps) {
  return (
    <Link
      to={`/event/${event.id}`}
      className="border border-slate-200 rounded-lg p-4 my-4 w-full"
    >
      <div key={event.id}>
        <img
          src={event.image}
          alt=""
          loading="lazy"
          className="event-picture w-full"
        />
        <p className="text-2xl text-blue-400">{event.name}</p>
        <p>{moment(event.date).format("DD MMMM ,dddd")}</p>
        <p>{event.location}</p>
      </div>
    </Link>
  );
}

export default EventBox;
