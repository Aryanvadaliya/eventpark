import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import { useFetch } from "../hooks/useFetch";

interface Seating {
  zone: string;
  price: number;
  id: number;
  isActive: boolean;
  quantity: number;
}

function CheckoutPage() {
  const { id } = useParams();
  const { data, isLoading } = useFetch({
    endpoint: `events/${id}`,
    method: "GET",
    skip: false,
  });

  const [seating, setSeating] = useState<Seating[]>([
    { zone: "General", price: 500, id: 1, isActive: false, quantity: 0 },
    { zone: "fanzone", price: 800, id: 2, isActive: false, quantity: 0 },
    { zone: "VIP zone", price: 1200, id: 3, isActive: false, quantity: 0 },
    { zone: "VVIP Tables", price: 5000, id: 4, isActive: false, quantity: 0 },
  ]);

  const totalPrice = seating.reduce(
    (total, seat) =>
      seat.isActive ? total + seat.quantity * seat.price : total,
    0
  );
  const handleAddClick = (id: number) => {
    const newSeating = seating.map((seat) =>
      seat.id === id
        ? { ...seat, isActive: true, quantity: 1 }
        : { ...seat, isActive: false, quantity: 0 }
    );
    setSeating(newSeating);
  };

  const handleQuantity = (e: any) => {
    if (e.target.id === "plus") {
      setSeating(
        seating.map((seat) =>
          seat.isActive ? { ...seat, quantity: seat.quantity + 1 } : seat
        )
      );
    } else if (e.target.id === "minus") {
      setSeating(
        seating.map((seat) =>
          seat.isActive
            ? seat.quantity === 1
              ? { ...seat, quantity: 0, isActive: false }
              : { ...seat, quantity: seat.quantity - 1 }
            : seat
        )
      );
    }
  };

  return (
    <>
      <p className="text-2xl mb-4 md:mx-4">Vanue Layout</p>
      <div className="flex md:mx-4 flex-wrap">
        <div className="flex justify-center w-full md:w-1/3">
          <img src="/layout.png" alt="Layout" />
        </div>
        <div className="md:ms-6 grow min-w-[300px] mx-2 ">
          {seating.map((seat) => (
            <div
              className="flex items-center justify-between border border-blue-500 px-4 py-2 rounded-lg mt-2 "
              key={seat.id}
            >
              <div>
                <p className="text-xl">{seat.zone}</p>
                <p>{seat.price} Rs.</p>
              </div>
              <div>
                {seat.isActive ? (
                  <div
                    className="flex gap-2 border-blue-500 border rounded-md px-2 py-1 items-center text-lg "
                    onClick={handleQuantity}
                  >
                    <Minus
                      color="#51a2ff"
                      id="minus"
                      className="cursor-pointer"
                    />
                    <p className="text-blue-400">{seat.quantity}</p>
                    <Plus
                      color="#51a2ff"
                      id="plus"
                      className="cursor-pointer"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddClick(seat.id)}
                    className="border border-blue-500  p-1 px-2 rounded-md cursor-pointer"
                  >
                    Add +
                  </button>
                )}

                <div></div>
              </div>
            </div>
          ))}

          <div className="flex justify-between grow mt-6 shadow-lg p-3 items-center md:relative rounded-lg sticky bg-white bottom-0">
            <p className="text-lg">
              <span className="text-blue-500">Total: </span>
              {totalPrice} Rs.
            </p>
            <Link
              to="/payment"
              className={` p-2 rounded-lg text-white ${
                totalPrice > 0
                  ? "bg-blue-500"
                  : "pointer-events-none bg-slate-400"
              }`}
              state={{
                ticketDetails: {
                  ...seating.filter((seat) => seat.isActive)[0],

                  ...data,
                },
                totalPrice: totalPrice,
              }}
            >
              Proceed
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
