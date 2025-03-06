import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useFetch } from "../hooks/useFetch";
import CardForm from "../Components.tsx/CardForm";
import { CircularProgress } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
);

function PaymentPage() {
  const location = useLocation();
  const { ticketDetails, totalPrice } = location.state;

  const {
    data,
    isLoading,
  }: { data: { clientSecret: string } | undefined; isLoading: boolean } =
    useFetch({
      endpoint: "get-intent",
      method: "POST",
      body: JSON.stringify({ amount: totalPrice }),
      skip: false,
    });

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
          <CardForm totalPrice={totalPrice} ticketDetails={ticketDetails} />
        </Elements>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default PaymentPage;
