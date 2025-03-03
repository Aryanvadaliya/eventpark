import { Link } from "react-router-dom"
import { EventData } from "../utils/types"
import moment from "moment"

function EventBox({event}: {event: EventData}) {
  return (
    <Link
    to={`/event/${event.id}`}
    className="border border-slate-200 rounded-lg p-4 my-4 "
  >
    <div key={event.id}>
      <img src={event.image} alt="" loading="lazy" className="event-picture" />
      <p className="text-2xl text-blue-400">{event.name}</p>
      <p>{moment(event.date).format("DD MMMM ,dddd")}</p>
      <p>{event.location}</p>
    </div>
  </Link>
  )
}

export default EventBox