import { Redirect, Route,Switch } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import ForgotPassword from "./components/Pages/ForgotPassword";
import Profile from "./components/Pages/Profile";
import Welcome from "./components/Pages/Welcome";

function App() {
  return (
    <div>
      <Switch>
      <Route path="/Welcome" exact>
        <Welcome/>
      </Route>
      <Route path="/Login">
      <AuthForm/>
      </Route>
      <Route path="/" exact>
        <Redirect to="/Login"/>
      </Route>
      <Route path='/profile'>

        <Profile></Profile>
        </Route>
      <Route path='/forgotpassword'>
        <ForgotPassword/>
      </Route>


      </Switch>
    </div>
  );
}
export default App;