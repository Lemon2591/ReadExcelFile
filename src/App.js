import logo from "./logo.svg";
import "./App.css";
import FormImport from "./view/FormImport";
import FormSearch from "./view/FormSearch";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <FormImport />
        </Route>

        <Route path="/FormSearch" exact>
          <FormSearch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
