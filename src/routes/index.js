import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Editor from "./editor";
import SignIn from "./signIn";
import Welcome from "./welcome";
import Landing from "./landingPage";
import SignUp from "./signUp";
import SelectionPage from "./selectionPage";
import UploadPage from "./uploadPage";
import Viewer from "./viewer";
import Guide from "./guide";

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/signIn" component={SignIn} />
      <Route path="/editor" component={Editor} />
      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/landingPage" component={Landing} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/selectionPage" component={SelectionPage} />
      <Route exact path="/uploadPage" component={UploadPage} />
      <Route path="/viewer" component={Viewer} />
      <Route exact path="/guide" component={Guide} />
    </Switch>
  </HashRouter>
);
