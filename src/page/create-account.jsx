import { useEffect, useState } from "react";
import { auth } from "../service/Auth";
import {
  check_data_is_exist,
  check_username_is_exist,
  Create_Account,
  get_userdata,
} from "../service/Auth/database";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useUserdatacontext } from "../service/context/usercontext";
import ProgressBar from "@badrap/bar-of-progress";

const CreateAccount = () => {
  const navigate = useNavigate();
  const { setuserdata } = useUserdatacontext();
  const pregress = new ProgressBar();
  const [isusernameexist, setisusernameexist] = useState(false);

  useEffect(() => {
    const data = async () => {
      if (await check_data_is_exist(auth?.currentUser?.uid)) {
        navigate("/home");
      }
    };
    data();
  });

  const [formdata, setformdata] = useState({
    name: "",
    username: "",
    bio: "",
    age: "",
  });

  const checkdata = async () => {
    pregress.start();
    await Create_Account({
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
      bio: formdata.bio,
      name: formdata.name,
      age: formdata.age,
      username: formdata.username,
      profileimg: auth.currentUser.photoURL || null,
    });
    setuserdata(await get_userdata(auth?.currentUser?.uid));
    pregress.finish();
    navigate("/home");
  };

  const handelchange = (e) => {
    const { name, value } = e.target;
    setformdata((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="capitalize sm:px-5 px-3">
      <Helmet>
        <title>Create account | socilaite</title>
        <meta name="description" content="Create account" />
        <link rel="canonical" href="/Create account" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Create account" />
        <meta name="author" content="Create account" />
        <meta name="language" content="EN" />
      </Helmet>
      <h1 className="text-4xl md:text-6xl sm:my-12 my-5 font-bold ">
        create an account with us{" "}
      </h1>
      <form
        className="flex flex-col  "
        onSubmit={(e) => {
          e.preventDefault();
          !isusernameexist && checkdata();
        }}
      >
        <div className="flex-col flex my-2">
          <label
            className="md:text-xl text-base font-sans p-1 mx-3 "
            min={4}
            max={10}
          >
            {" "}
            username
          </label>
          <input
            type="text"
            name="username"
            placeholder="enter your unique uername ..."
            maxLength={20}
            value={formdata.username}
            className="px-5 placeholder:capitalize bg-black text-white  border-2 border-gray-300 placeholder:font-serif placeholder:text-neutral-500 w-80 md:w-2/5 md:text-lg text-sm p-2 border-3   rounded-2xl my-2"
            onChange={async (e) => {
              handelchange(e);
              const data = await check_username_is_exist(
                e.target.value.trim().toLowerCase()
              );
              const isValidInput = /^[a-zA-Z0-9_]+$/.test(
                e.target.value.trim().toLowerCase()
              );
              if (data || !isValidInput) {
                setisusernameexist(true);
                e.target.style.borderColor = "red";
              } else {
                setisusernameexist(false);
                e.target.style.borderColor = "black";
              }
            }}
            required
          ></input>

          <label className="text-gray-500 text-sm mx-3 m-1">
            username should not includes any special charcter
          </label>
        </div>

        {isusernameexist && (
          <label className="text-red-400 mx-3 capitalize">
            invalid username or already exist
          </label>
        )}
        <div className="flex-col flex my-2">
          <label className="md:text-xl text-base font-sans p-1 mx-3 ">
            {" "}
            full name{" "}
          </label>

          <input
            min={4}
            max={10}
            type="text"
            name="name"
            placeholder="full name..."
            value={formdata.name}
            className="px-5 placeholder:capitalize bg-black text-white  border-2 border-gray-300 placeholder:font-serif placeholder:text-neutral-500  w-80 md:w-2/5 md:text-lg text-sm p-2 border-1  rounded-2xl my-2   "
            onChange={handelchange}
            required
          ></input>
        </div>

        <div className="flex-col flex my-2">
          <label className="md:text-xl text-base  font-sans p-1 mx-3 ">
            date of birth
          </label>
          <input
            type="date"
            name="age"
            value={formdata.age}
            className="px-5 placeholder:capitalize bg-black text-white  border-2 border-gray-300 placeholder:font-serif placeholder:text-neutral-500  w-80 md:w-2/5   md:text-lg text-sm p-2 border-1   rounded-2xl my-2   "
            onChange={(e) => {
              handelchange(e);
              if (
                formdata.age > new Date() ||
                formdata?.age < new Date("1970-1-1")
              ) {
                e.target.accepter = false;
              }
            }}
            required
          ></input>
        </div>
        <div className="flex-col flex my-2">
          <label className="md:text-xl text-base  font-sans p-1 mx-3 ">
            about yourself
          </label>

          <textarea
            type="text"
            min={4}
            max={50}
            name="bio"
            placeholder="write about your exprience , your favirate topics and many more about you "
            value={formdata.bio}
            className="px-5 placeholder:capitalize bg-black text-white  border-2 border-gray-300 placeholder:font-serif placeholder:text-neutral-500  w-80 md:w-2/5   md:text-lg text-sm p-2 border-1   rounded-2xl my-2   "
            onChange={handelchange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="rounded-2xl text-lg mx-3 md:text-xl border-white my-6 p-2 mr-auto md:w-80 px-7 border-1 capitalize bg-sky-600 hover:scale-105 transition-all ease"
        >
          create account
        </button>
      </form>{" "}
    </div>
  );
};

export default CreateAccount;
