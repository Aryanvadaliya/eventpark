import { TextField } from "@mui/material";
import { isEmptyArray, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setToken, setUser } from "../store/authSlice";

function SignupPage() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const handleSubmit = async (values: any) => {
    if (
      values.email &&
      values.password &&
      values.firstName &&
      values.lastName
    ) {
      console.log(values);

      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            token: "bjhbewuivbiwjeb382y5y738hfuie",
            role: "user",
          }),
        });
        const user = await response.json();
        if (isEmptyArray(user)) toast("User doesn't exist", { type: "error" });
        else {
          toast("Login Successful", { type: "success" });
          dispatch(setToken(user[0].token));
          dispatch(setUser(user[0]));
          localStorage.setItem("token", user[0].token);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast("Please fill the details", { type: "error" });
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  const { values, errors, getFieldProps } = formik;

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-slate-100 ">
        <div className="flex gap-3 p-8 bg-white flex-col justify-center">
          <p className="text-3xl mb-6">
            Welcome to Event<span className="text-blue-500">Park</span>
          </p>
          <TextField
            type="email"
            {...getFieldProps("email")}
            className="p-3 rounded-md"
            placeholder="Email"
            label="Email"
          />
          <TextField
            type="text"
            {...getFieldProps("firstName")}
            className="p-3 rounded-md"
            // placeholder="First name"
            label="First name"
          />
          <TextField
            type="text"
            {...getFieldProps("lastName")}
            className="p-3 rounded-md"
            // placeholder="Last name"
            label="Last name"
          />
          <TextField
            type="password"
            {...getFieldProps("password")}
            className="p-3 rounded-md"
            label="Password"
            placeholder="password"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(values);
            }}
            className="bg-blue-500 p-3 text-white px-6 rounded-md cursor-pointer"
          >
            Signup
          </button>
          <p className="text-center">
            Not a user?{" "}
            <Link to={"/auth/login"} className="text-blue-500 underline ">
              login Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
