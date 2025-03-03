import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch"; // Assuming this is a custom hook
import CardForm from "../Components.tsx/CardForm";

// Load your Stripe public key
const stripePromise = loadStripe(
  "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
);

function PaymentPage() {
  const location = useLocation();
  const { ticketDetails, totalPrice } = location.state;

  // Fetch the client secret from your backend (assumed to be working correctly)
  const { data, isLoading }: {data: {clientSecret: string} | undefined, isLoading: boolean} = useFetch({
    endpoint: "get-intent",
    isPost: true,
    body: { amount: totalPrice }, // amount should be in cents
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:w-1/2 m-6">
      {data && data.clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: data.clientSecret }}
        >
          <CardForm clientSecret={data.clientSecret} />
        </Elements>
      ) : (
        <div>No client secret found. Something went wrong.</div>
      )}
    </div>
  );
}

export default PaymentPage;
