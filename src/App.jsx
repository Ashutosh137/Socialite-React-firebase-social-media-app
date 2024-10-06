import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./page/home";
import signuppage from "./page/signuppage";
import { Loginpage } from "./page/loginpage";
import CreateAccount from "./page/create-account";
import { useState } from "react";
import { UserDataProvider } from "./service/context/usercontext";
import Setting from "./page/setting";
import { ToastContainer } from "react-toastify";
import { Profilepage } from "./page/profilepage";
import Notification from "./page/notification";
import Seepost from "./page/seepost";
import Search from "./page/search";
import Notfound from "./page/not-found";
import { Layout } from "./layout/layout";
import { List } from "./page/list";

function App() {
  const [userdata, setuserdata] = useState(null);
  return (
    <UserDataProvider value={userdata} setvalue={setuserdata}>
      <div className=" xl:mx-16 mt-10 md:mt-5">
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
          <Route exect path="/" Component={signuppage} />
          <Route exect path="/login" Component={Loginpage} />
          <Route path="/home" element={<Layout Component={Home} />} />
          <Route exect path="/create-account" Component={CreateAccount} />
          <Route exect path="/search" element={<Layout Component={Search} />} />
          <Route
            exect
            path="/profile/:username"
            element={<Layout Component={Profilepage} />}
          />
          <Route
            exect
            path="/profile/:username/:postid"
            element={<Layout Component={Seepost} />}
          />
          {userdata && (
            <Route
              exect
              path="/setting"
              element={<Layout Component={Setting} suggetion={false} />}
            />
          )}
          {userdata && (
            <Route
              exect
              path="/notification"
              element={<Layout Component={Notification} />}
            />
          )}
          {userdata && (
            <Route exect path="/lists" element={<Layout Component={List} />} />
          )}
          <Route path="*" Component={Notfound} />
        </Routes>
      </div>
    </UserDataProvider>
  );
}

export default App;
