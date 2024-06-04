import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/new" component={NewTask} />
      <Route exact path="/edit/:id" component={EditTask} />
    </Switch>
  );
}
