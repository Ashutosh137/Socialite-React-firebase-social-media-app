import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Auth";
import { useNavigate } from "react-router-dom";
import { get_userdata, updateuserdata } from "../Auth/database";
import { toast } from "react-toastify";
import image from '/src/assets/defaultprofileimage.png'


export const UserDataContext = createContext();

export const UserDataProvider = ({ children, value }) => {
  const [postpopup, setpostpopup] = useState(false)
  const [userdata, setuserdata] = useState(value)
const [defaultprofileimage, setdefaultprofileimage] = useState(image)

  console.log("userdata getting", userdata)

  const navigate = useNavigate()

  useEffect(() => {
    const datalogin = async () => {
      await auth.onAuthStateChanged(async (user) => {
        if (user) {
          let data = await get_userdata(user?.uid);
          console.log('getting userdata from useeffect in authchage')
          if (data?.username) setuserdata(data);
          
          else {
            navigate('/create-account')
          }
        }
      })
    }
    datalogin();
  }, [])

  
  useEffect(() => {
    const data = async () => {
      userdata !== null &&
        await updateuserdata(userdata)
    }
    data()
  }, [userdata])

  
  const togglepost = () => {
    setpostpopup(!postpopup)
  }
  return (
    <UserDataContext.Provider value={{ postpopup, defaultprofileimage, userdata, setuserdata, togglepost }} >
      {children}
    </UserDataContext.Provider>
  );
};

export const useuserdatacontext = () => {
  const value = useContext(UserDataContext)
  return value;
}