import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


// Layout Components
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";


// Pages
import Home from "./Pages/Home/Home";
import TermandCondition from "./Pages/TermandCondition/TermandCondition";
import MainFaq from "./Pages/MainFaq/MainFaq";


// Components
import SignIn from "./Components/SignIn/SignIn";



const App = () => {

  return (

    <BrowserRouter>


      {/* Common Navbar */}
      <Navbar />



      <Routes>


        {/* Default Redirect */}

        <Route
          path="/"
          element={
            <Navigate
              to="/home"
              replace
            />
          }
        />



        {/* Home Page */}

        <Route
          path="/home"
          element={<Home />}
        />



        {/* Authentication */}

        <Route
          path="/signin"
          element={<SignIn />}
        />



        {/* Static Pages */}

        <Route
          path="/term"
          element={<TermandCondition />}
        />


        <Route
          path="/faq"
          element={<MainFaq />}
        />



        {/* Unknown Route */}

        <Route
          path="*"
          element={
            <Navigate
              to="/home"
              replace
            />
          }
        />


      </Routes>




      {/* Common Footer */}

      <Footer />


    </BrowserRouter>

  );

};


export default App;