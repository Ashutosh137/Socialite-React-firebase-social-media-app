import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Auth";
import { useNavigate } from "react-router-dom";
import { get_userdata, updateuserdata } from "../Auth/database";
import image from "/src/assets/defaultprofileimage.png";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children, value, setvalue }) => {
  const [postpopup, setpostpopup] = useState(false);
  const [userdata, setuserdata] = useState(value);
  const [defaultprofileimage, setdefaultprofileimage] = useState(image);

  const navigate = useNavigate();

  useEffect(() => {
    const datalogin = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          let data = await get_userdata(user?.uid);
          if (data?.username) {
            setuserdata(data);
            setvalue(data);
          } else {
            navigate("/create-account");
          }
        }
      });
    };
    datalogin();
  }, []);

  useEffect(() => {
    const data = async () => {
      userdata !== null && (await updateuserdata(userdata));
    };
    data();
  }, [userdata]);

  const togglepost = () => {
    setpostpopup(!postpopup);
  };
  return (
    <UserDataContext.Provider
      value={{
        postpopup,
        defaultprofileimage,
        userdata,
        setuserdata,
        togglepost,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserdatacontext = () => {
  const value = useContext(UserDataContext);
  return value;
};
