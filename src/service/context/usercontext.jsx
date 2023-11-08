import { createContext, useContext, useState } from "react";
import { auth } from "../Auth";
import { useNavigate } from "react-router-dom";


export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [postpopup, setpostpopup] = useState(false)
    const togglepost=()=>{
        setpostpopup(!postpopup)
    }
    return (
        <UserDataContext.Provider value={{postpopup,togglepost}} >
            {children}
        </UserDataContext.Provider>
    );
};

export const useuserdatacontext=()=>{
    const value=useContext(UserDataContext)
    return value;
}