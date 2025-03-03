import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

function CardForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe or Elements is not loaded.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setError(error.message || "Payment failed");
      setIsLoading(false);
    } else if (paymentIntent?.status === "succeeded") {
      setIsLoading(false);
      alert("Payment successful!");
      // You might want to redirect or update the UI accordingly
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={isLoading} className="bg-blue-500 p-4">
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

export default CardForm;
