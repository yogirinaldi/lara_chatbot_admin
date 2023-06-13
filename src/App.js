import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import { useState, createContext, useReducer, useEffect } from "react";
import Topbar from "./pages/global/Topbar";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import Dashboard from "./pages/dashboard";
import axios from "axios";
import User from "./pages/user";
import Question from "./pages/question";
import Dataset from "./pages/dataset";
import Login from "./pages/login";
import CircularLoading from "./components/CircularLoading";

//Context
export const AuthContext = createContext();

//Initial state
// const initialState = {
//   isAuthenticated: false,
//   id_admin: null,
//   nama: null,
//   email: null,
// };

const larakey = process.env.REACT_APP_LARA;
const larahost = process.env.REACT_APP_HOST;

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const encryptedAdmin = CryptoJS.AES.encrypt(
        JSON.stringify({
          id_admin: action.payload.id_admin,
          nama: action.payload.nama,
          email: action.payload.email,
        }),
        larakey
      ).toString();
      Cookies.set("authAdmin", encryptedAdmin, { expires: 3 });

      return {
        ...state,
        isAuthenticated: true,
        id_admin: action.payload.id_admin,
        nama: action.payload.nama,
        email: action.payload.email,
      };
    case "LOGOUT":
      Cookies.remove("authAdmin");
      return {
        ...state,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

const App = () => {
  const [theme, colorMode] = useMode();

  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    const existingAuthAdmin = Cookies.get("authAdmin");

    if (existingAuthAdmin) {
      const decryptedAdmin = CryptoJS.AES.decrypt(
        existingAuthAdmin,
        larakey
      ).toString(CryptoJS.enc.Utf8);

      const adminData = JSON.parse(decryptedAdmin);

      dispatch({
        type: "LOGIN",
        payload: {
          id_admin: adminData.id_admin,
          nama: adminData.nama,
          email: adminData.email,
        },
      });
    }
  }, []);

  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [goodFeedback, setGoodFeedBack] = useState(0);
  const [badFeedBack, setBadFeedBack] = useState(0);

  useEffect(() => {
    const fetchTrafficData = async () => {
      const responseQuestions = await axios.get(larahost + "/question");
      setQuestions(responseQuestions.data.data);

      const responseUsers = await axios.get(larahost + "/user");
      setUsers(responseUsers.data.data);
    };

    // Fetch initial traffic data
    fetchTrafficData();

    // Fetch new traffic data every 40 seconds
    const intervalId = setInterval(fetchTrafficData, 40000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // feedback
    let goodFeed = 0;
    let badFeed = 0;
    questions.map((item) => {
      if (item.feedback === true) {
        goodFeed += 1;
      } else if (item.feedback === false) {
        badFeed += 1;
      }
      return null;
    });

    setGoodFeedBack(goodFeed);
    setBadFeedBack(badFeed);
  }, [questions]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {!state.isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <ColorModeContext.Provider value={colorMode}>
          {questions.length !== 0 ? (
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <MyProSidebarProvider>
                <div style={{ height: "100%", width: "100%" }}>
                  <main>
                    <Topbar />
                    <Routes>
                      <Route path="*" element={<Navigate to="/" replace />} />
                      <Route
                        exact
                        path="/"
                        element={
                          <Dashboard
                            questions={questions}
                            users={users}
                            goodFeedback={goodFeedback}
                            badFeedBack={badFeedBack}
                          />
                        }
                      />
                      <Route
                        path="/user"
                        element={<User users={users} questions={questions} />}
                      />
                      <Route
                        path="/question"
                        element={
                          <Question questions={questions} users={users} />
                        }
                      />
                      <Route path="/dataset" element={<Dataset />} />
                    </Routes>
                  </main>
                </div>
              </MyProSidebarProvider>
            </ThemeProvider>
          ) : (
            <CircularLoading />
          )}
        </ColorModeContext.Provider>
      )}
    </AuthContext.Provider>
  );
};

export default App;
