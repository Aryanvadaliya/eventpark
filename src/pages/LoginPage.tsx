import { TextField } from "@mui/material";
import { isEmptyArray, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setToken, setUser } from "../store/authSlice";

function LoginPage() {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const dispatch = useDispatch();
  const location = useLocation();
  const {pathname} = location.state?.from || { pathname: "/" };
  

  const handleSubmit = async (values: any) => {
    if (values.email && values.password) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/users?email_like=${
            values.email
          }&password_like=${values.password}`
        );
        const user = await response.json();
        if (isEmptyArray(user)) toast("User doesn't exist", { type: "error" });
        else {
          toast("Login Successful", { type: "success" });
          dispatch(setToken(user[0].token));
          dispatch(setUser(user[0]));
          localStorage.setItem("token", user[0].token);
          
          navigate(pathname);
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
            Login
          </button>
          <p className="text-center">
            Not a user?{" "}
            <Link to={"/auth/signup"} className="text-blue-500 underline ">
              Signup Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
