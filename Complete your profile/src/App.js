import { Redirect, Route } from "react-router-dom";
import { Redirect, Route,Switch } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Profile from "./components/Pages/Profile";
import Welcome from "./components/Pages/Welcome";

function App() {
  return (
    <div>
      <Route path="/Welcome">
      <Switch>
      <Route path="/Welcome" exact>
        <Welcome/>
      </Route>
      <Route path="/Login">
      <AuthForm/>
      </Route>
      <Route path="/">
      <Route path="/" exact>
        <Redirect to="/Login"/>
      </Route>
      <Route path='/profile'>

        <Profile></Profile>
        </Route>


      </Switch>
    </div>
  );
}
export default App;