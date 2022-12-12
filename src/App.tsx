import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./pages/main/main";
import MoreDetail from "./pages/moreDetail/moreDetail";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/:id" exact>
        <MoreDetail />
      </Route>
    </Switch>
  );
};

export default App;
