import { Link } from "react-router-dom";
import { EventData } from "../utils/types";
import moment from "moment";
type EventBoxProps = {
  event: EventData;
  isAdmin?: boolean;
};

function EventBox({
  event,
  isAdmin = false,
}:EventBoxProps) {
  return (
    <Link
      to={`/event/${event.id}`}
      className="border border-slate-200 rounded-lg p-4 my-4 "
    >
      <div key={event.id}>
        <img
          src={event.image}
          alt=""
          loading="lazy"
          className="event-picture"
        />
        <p className="text-2xl text-blue-400">{event.name}</p>
        <p>{moment(event.date).format("DD MMMM ,dddd")}</p>
        <p>{event.location}</p>
        {isAdmin && (
          <div className="mt-2">
            <Link
              to={"/edit"}
              className="px-4 py-1 bg-blue-500 text-white rounded-md"
            >
              Edit
            </Link>
            <button className="px-4 py-1 bg-blue-500 text-white rounded-md ms-4">
              Delete
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}

export default EventBox;
