import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetch } from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../utils/types";
import { setUser } from "../store/authSlice";

function CardForm({ totalPrice, ticketDetails }: { totalPrice: number; ticketDetails: Object }) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: ReduxState) => state.auth.user)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe or Elements is not loaded.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: "test User",
            address: {
              line1: "456 surat",
              line2: "Gujarat",
              city: "surat",
            },
          },
        },
      },
    });

    if (error) {
      setIsLoading(false);
      setError(error.message || "Payment failed");
    }
    if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      toast("Payment succesfful", { type: "success" });
      const {data, isLoading} = useFetch({endpoint: `/users/{user.id}`, method: "PUT", body: {...user, tickets: [...user?.tickets, ticketDetails]}})
      console.log(data);
      
    //   dispatch(setUser(data))
      setTimeout(() => navigate("/my-ticket"), 2000);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={isLoading} className="bg-blue-500 p-3 text-white mt-4 w-full">
          {isLoading ? "Processing" : `Pay ${totalPrice} Rs`}
        </button>
      </form>
  );
}

export default CardForm;
