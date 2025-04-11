import moment from "moment";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { TicketData } from "../utils/types";

function TicketPage() {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="text-2xl m-4">My tickets</div>
      <div className="m-4 flex flex-wrap gap-4">
        {currentUser?.tickets?.length > 0 ? (
          currentUser?.tickets?.map((ticket) => (
            <div className="border border-blue-500 px-4 py-2 md:w-1/2 rounded-lg flex sm:flex-nowrap flex-wrap " key={ticket.ticketNumber}>
              <img src={ticket.image} alt="" className="sm:w-1/2" />
              <div className="sm:w-1/2 ms-2 py-3">
              <p>
                  <span className="font-bold me-3">Ticket Number: </span>{" "}
                  {ticket.ticketNumber}
                </p>
                <p>
                  <span className="font-bold me-3">Date:</span>{" "}
                  {moment(ticket.date).format("ddd ,DD MMM YYYY")}
                </p>
                <p>
                  <span className="font-bold me-3">Time:</span>{" "}
                  {moment(ticket.date).format("h:mm a")}
                </p>
                <p>
                  <span className="font-bold me-3">Name:</span> {ticket.name}
                </p>
                <p>
                  <span className="font-bold me-3">Price:</span>
                  {ticket.price} Rs.
                </p>
                <p>
                  <span className="font-bold me-3">Quantity:</span>
                  {ticket.quantity}
                </p>
                <p>
                  <span className="font-bold me-3">Total Price:</span>
                  {ticket.price * ticket.quantity} Rs.
                </p>
              </div>
            </div>
          ))
        ) : (
          <>
            <p>No tickets found </p>
            <p>Expore events by clicking <Link to='/' className="text-blue-500 underline cursor-pointer">Here</Link></p>
          </>
        )}
      </div>
    </>
  );
}

export default TicketPage;
