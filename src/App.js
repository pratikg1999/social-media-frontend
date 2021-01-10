import './App.css';
import { createStore } from "redux";
import { Switch, Route } from "react-router-dom";
import LoginApp from "./pages/login/LoginApp";
import providerHOC from "./hoc/providerHoc";
import reducer from "./store/reducer";
import Dashboard from './pages/dashboard/Dashboard';

const store = createStore(reducer);

function App() {
  return (
    <div>
      <Switch>
          <Route path="/" exact component={LoginApp} />
          <Route path="/" component={providerHOC(Dashboard, store)} />
          {/* <Route path="/profile" component={providerHOC(Dashboard, store)} /> */}
        </Switch>
    </div>
  );
}

export default App;
