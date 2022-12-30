import React from 'react';
import TopBar from './components/top-bar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './auth/auth';
import './App.css';
import Acceuil from './components/fiche/acceuil';
import Filtre from './components/fiche/filtre';
import Form from './components/fiche/form';
import Fiche from './components/fiche/fiche';
import Edit from './components/fiche/edit';
import Login from './components/log/login';
import Signup from './components/log/signup';
import AuthService from './auth/auth';
import Logout from './components/log/logout';
import store from './components/store';
import { Provider } from 'react-redux';
import Home from './components/Home';
import HistoriqueFacture from './components/facture/HistoriqueFacture';
import FactureForm from './components/facture/FactureForm';
import FacutreFinalForm from './components/facture/FacutreFinalForm';



class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      authTokens: AuthService.getTokensLocal(),
      isLog :AuthService.getLogLocal(),
    }
    this.checkLog = this.checkLog.bind(this);
  }
  
  checkLog() {
    const joker = AuthService.getTokensLocal();
    this.setState({ authTokens: joker });
    if (joker === null) {
      this.setState({ isLog: false });
    } else if (joker !== null) {
        this.setState({ isLog: true });
    }
  }

  componentDidMount(){
    this.checkLog();
  }
  
  handleLogOff(log) {
    this.setState({ isLog: log });
    AuthService.logOut();
    this.checkLog();
  }
  handleLogOn(log) {
    this.setState({ isLog: log });
    this.checkLog();
  }
  render(){
    const setTokens = (data) =>{
      this.setState({ authTokens: data});
    } 
    const authJoker = this.state.authTokens;
    const isLog = this.state.isLog;
    
    return (
      <AuthContext.Provider value={{ authTokens: authJoker, setAuthTokens: setTokens}} >
        <Provider store={store}>
          <BrowserRouter>
            <div>
                <TopBar isLog={isLog} handleLog = {this.handleLogOff.bind(this)} />
              <Switch>
                <Route path="/" component={Home} exact />

                <PrivateRoute path="/signup" component={Signup} exact />
                <PrivateRoute path="/fiche" component={Acceuil} exact isAuth={this.handleLogOn.bind(this)} />} />
                <PrivateRoute path="/filtre" component={Filtre} exact isAuth={this.handleLogOn.bind(this)}/>
                <PrivateRoute path="/nouvelle-fiche" component={Form} exact isAuth={this.handleLogOn.bind(this)}/>
                <PrivateRoute path="/fiche/:id" component={Fiche} exact isAuth={this.handleLogOn.bind(this)} />
                <PrivateRoute path="/edit/:id" component={Edit} exact isAuth={this.handleLogOn.bind(this)}/>

                <PrivateRoute path="/facture" component={HistoriqueFacture} exact isAuth={this.handleLogOn.bind(this)} />
                <PrivateRoute path="/nouvelle-facture" component={FactureForm} exact isAuth={this.handleLogOn.bind(this)} />
                <PrivateRoute path="/nouvelle-facture-final" component={FacutreFinalForm} exact isAuth={this.handleLogOn.bind(this)} />

                <Route path="/login" render={(props) => <Login {...props} isAuth={this.handleLogOn.bind(this)}/>} exact />
                <Route path="/logout" component={Logout} exact />
                <Route component={Error} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </AuthContext.Provider>
    );
  }
}
export default App;
