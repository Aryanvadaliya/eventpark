import { useLocation } from "react-router-dom";

function PaymentPage() {
  const location = useLocation();
  const { from } = location.state;
  console.log(from);

  return <>Payment page for user</>;
}

export default PaymentPage;
