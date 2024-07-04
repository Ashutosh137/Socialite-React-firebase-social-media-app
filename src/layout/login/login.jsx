import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, forget_password, signInWithGoogle } from "../../service/Auth";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../ui/input";
import Button from "../../ui/button";
import PropTypes from "prop-types";

const Login = ({ onenter, role }) => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  const navigate = useNavigate();

  const handelsubmit = async () => {
    await onenter(email, pass);
  };

  const handelgooglesignup = async () => {
    const data = await signInWithGoogle().then(() => {
      data && role === "signup"
        ? navigate("./create-account")
        : navigate("/home");
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      auth.currentUser && navigate("/home");
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="flex post flex-col sm:w-3/4  p-4 w-full">
      <h3 className="text-3xl my-2 font-bold "> join now </h3>
      <div className=" my-5 sm: bg-white text-black text-center hover:scale-105 transition-all ease font-semibold outline rounded-2xl ">
        <button
          className="m-auto capitalize flex p-2 px-6 text-base sm:text-xl "
          onClick={handelgooglesignup}
        >
          <i className="mx-2">
            <GoogleIcon />
          </i>
          {role} with Google
        </button>
      </div>
      <div className="my-4 ">
        <hr />
        <h2 className="text-xl text-center py-2 font-semibold mx-4">
          or , continue with email
        </h2>
        <hr />
      </div>

      <form
        className="flex flex-col "
        onSubmit={(e) => {
          e.preventDefault();
          handelsubmit();
        }}
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
          className={"my-2 outline"}
        />
        <Input
          type="password"
          placeholder="password"
          value={pass}
          onChange={(e) => setpass(e.target.value)}
          required
          className={"my-1 outline"}
        />
        <p className="text-xs sm:text-sm py-3 ">
          By signing up, you agree to the <b>Terms of Service</b> and
          <b> Privacy Policy</b>, including Cookie Use.
        </p>
        <Button className={"w-40 rounded-xl"} type="submit">
          {role}
        </Button>

        {role === "login" && (
          <button
            onClick={async () => {
              if (email === "") toast.error("plase enter your email address");
              else {
                const data = await forget_password(email);
                if (!data) toast.error("Email not found");
                else toast.success("Email sent , please check your email box");
              }
            }}
            className="mr-auto"
            type="button"
          >
            Forget password ?
          </button>
        )}
      </form>
      {role === "signup" ? (
        <div className="my-3  capitalize text-base sm:text-xl flex flex-col ">
          <label className="my-3">already have an account ? </label>
          <Link
            to="/login"
            className="my-3 w-80 mx-auto border-1 rounded-2xl text-center border font-semibold py-1 text-sky-600 capitalize"
          >
            sign-in
          </Link>
        </div>
      ) : (
        <div className="my-2  capitalize text-base sm:text-xl flex flex-col ">
          <label className="my-3">don't have an account ? </label>
          <Link
            to="/"
            className="my-3 w-80 mx-auto border-1 rounded-2xl border text-center font-semibold py-1 text-sky-600 capitalize"
          >
            sign-up
          </Link>
        </div>
      )}
    </section>
  );
};

Login.PropTypes = {
  role: PropTypes.string,
  onenter: PropTypes.func,
};
export default Login;
