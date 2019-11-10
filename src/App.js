import React, { Fragment } from 'react';
import { EachWhole } from "@router";
import Eachrouter from "@utils/routerEach";
import { Switch, Redirect } from "react-router-dom"
class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Switch>
          {Eachrouter(EachWhole)}
          <Redirect from="/" to="/Home" />
        </Switch>
      </Fragment>
    )
  }
}

export default App;
