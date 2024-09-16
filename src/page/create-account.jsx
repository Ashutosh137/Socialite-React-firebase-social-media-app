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
import Button from "../ui/button";
import { Input, TextInput } from "../ui/input";

const CreateAccount = () => {
  const pregress = new ProgressBar();
  const navigate = useNavigate();
  const { setuserdata } = useUserdatacontext();
  const [IsUsernameExist, setIsUsernameExist] = useState(false);

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

  const handelusername = async (e) => {
    handelchange(e);
    const data = await check_username_is_exist(
      e.target.value.trim().toLowerCase(),
    );
    const isValidInput = /^[a-zA-Z0-9_]+$/.test(
      e.target.value.trim().toLowerCase(),
    );
    if (data || !isValidInput) {
      setIsUsernameExist(true);
      e.target.style.borderColor = "red";
    } else {
      setIsUsernameExist(false);
      e.target.style.borderColor = "black";
    }
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
        create an account with us
      </h1>
      <form
        className="flex flex-col space-y-6  "
        onSubmit={(e) => {
          e.preventDefault();
          !IsUsernameExist && checkdata();
        }}
      >
        <Input
          type="text"
          name="username"
          className={"max-w-80 my-2 sm:max-w-md"}
          placeholder="enter your unique uername ..."
          maxLength={20}
          value={formdata.username}
          onChange={handelusername}
          required
        />

        <label className="text-gray-500 text-sm mx-3 m-1">
          username should not includes any special charcter
        </label>

        {IsUsernameExist && (
          <label className="text-red-400 mx-3 capitalize">
            invalid username or already exist
          </label>
        )}

        <Input
          min={4}
          max={10}
          type="text"
          className={"max-w-80 my-2 sm:max-w-md"}
          name="name"
          placeholder="full name..."
          value={formdata.name}
          onChange={handelchange}
          required
        />

        <Input
          type="date"
          name="age"
          value={formdata.age}
          className={"max-w-80 my-2 sm:max-w-md"}
          onChange={handelchange}
          required
        />

        <TextInput
          type="text"
          min={4}
          max={50}
          className={"max-w-80 my-2 sm:max-w-md"}
          name="bio"
          placeholder="write about your exprience , your favirate topics and many more about you "
          value={formdata.bio}
          onChange={handelchange}
        />
        <Button className="p-9 py-2" type="submit">
          create-account
        </Button>
      </form>
    </div>
  );
};

export default CreateAccount;
