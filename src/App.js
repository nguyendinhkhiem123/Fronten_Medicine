import { Switch, Route, Redirect } from "react-router-dom";

import Sidebar from "components/Sidebar";
import Dashboard from "pages/Dashboard";
import Settings from "pages/Settings";
import Tables from "pages/Tables";
import Maps from "pages/Maps";
import Footer from "components/Footer";
import Login from "pages/Login";

import "assets/styles/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-medium-image-zoom/dist/styles.css'

import { useSelector } from "react-redux";
import { Suspense } from "react";

import Loading from "components/Loading";

import route from "./route";

function App() {
  const isLogin = useSelector((state) => state.Login);
  return (
    <>
      {isLogin ? (
        <div className="">
          <div className="md:ml-64">
            <Suspense fallback={Loading}>
              <Sidebar />
              <>
                <div className="bg-light-blue-500 px-3 md:px-8 h-40" />

                <div className="px-3 md:px-8 -mt-24">
                  <div className="container mx-auto max-w-full">
                    <Switch>
                      {route.map((value, index) => {
                        return (
                          <Route
                            key={index}
                            exact={value.exact}
                            path={value.path}
                            component={value.component}
                          />
                        );
                      })}
                      <Redirect from="*" to="/" />
                    </Switch>
                  </div>
                </div>
              </>
            </Suspense>

            <Footer />
          </div>
        </div>
      ) : (
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Redirect from="*" to="/login" />
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
