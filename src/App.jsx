import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./page/home";
import signuppage from "./page/signuppage";
import { Loginpage } from "./page/loginpage";
import CreateAccount from "./page/create-account";
import { useState } from "react";
import { UserDataProvider } from "./service/context/usercontext";
import Setting from "./page/setting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Profilepage } from "./page/profilepage";
import { List } from "./page/list";
import Notification from "./page/notification";
import Seepost from "./component/seepost";
import Search from "./page/search";

function App() {
  const [userdata] = useState(null);

  return (
    <UserDataProvider value={userdata}>
      <div className=" xl:mx-16 mt-20 sm:mt-5">
        <ToastContainer
          position="top-center"
          autoClose={400}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          <Route path="/home" Component={Home} />
          <Route exect path="/" Component={signuppage} />
          <Route exect path="/create-account" Component={CreateAccount} />
          <Route exect path="/login" Component={Loginpage} />
          <Route exect path="/notification" Component={Notification} />
          <Route exect path="/setting" Component={Setting} />
          <Route exect path="/search" Component={Search} />
          <Route exect path="/profile/:username" Component={Profilepage} />
          <Route exect path="/profile/:username/:postid" Component={Seepost} />
          <Route exect path="/lists" Component={List} />
        </Routes>
      </div>
    </UserDataProvider>
  );
}

export default App;
