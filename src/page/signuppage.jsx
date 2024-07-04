import { signupwithemail } from "../service/Auth/index";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Login from "../component/login";
import { toast } from "react-toastify";

const Signuppage = () => {
  const navigate = useNavigate();

  const handelsubmit = async (email, pass) => {
    const sigup = await signupwithemail(email, pass);
    sigup && toast.success("signup successfully ");
    sigup && navigate("/create-account");
  };

  return (
    <div className="w-full align-middle my-auto flex post sm:mt-5 p-2 capitalize">
      <Helmet>
        <title>Sign up | socilaite</title>
        <meta name="description" content="sign-up" />
        <link rel="canonical" href="/login" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="sign-up" />
        <meta name="author" content="sign-up" />
        <meta name="language" content="EN" />
      </Helmet>

      <div className=" m-auto outline xl:block hidden  outline-gray-900">
        <img
          className="w-80"
          src="https://cdn.dribbble.com/users/4329662/screenshots/15802739/socialite_v3_final-08_copy.png"
          alt=""
        />
      </div>
      <div>
        <h1 className="text-5xl mx-1 text-left font-bold  ">happening now </h1>
        <Login onenter={handelsubmit} role="signup" />
      </div>
    </div>
  );
};

export default Signuppage;
