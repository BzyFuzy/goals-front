import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "./utils/sidebar";
const TReport = React.lazy(() => import("./pages/TReport"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div
          style={{ background: "blue", minHeight: "100vh", display: "flex" }}
        >
          <Sidebar />
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/reports">Reports</Link>
              </li>
            </ul>
          </nav> */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/reports" component={TReport} />
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
}

const Home = () => {
  return <div> Hello</div>;
};

export default App;
