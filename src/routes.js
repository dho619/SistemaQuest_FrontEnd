import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

//Imports de outros arquivos
import { isAuthenticated, isAdmin } from "./services/auth"
//Imports pages
import AdquirirPlano from "./pages/UsuariosLogados/AdquirirPlano"
import CadastroAvaliacao from "./pages/UsuariosLogados/CadastroAvaliacao"
import CadastroPesquisado from "./pages/UsuariosLogados/CadastroPesquisado"
import Home from "./pages/Home"
import Perfis from './pages/Admin/Perfis'
import Avaliacoes from "./pages/UsuariosLogados/Avaliacoes"
import PesquisadosAval from "./pages/UsuariosLogados/PesquisadosAval"
import QuestsPlano from "./pages/UsuariosLogados/QuestsPlano"
import RegisterProfile from "./pages/Admin/RegisterProfile"
import RespondeAval from "./pages/UsuariosLogados/RespondeAval"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import SignupAdmin from "./pages/Admin/SignUpAdmin"
import Usuarios from './pages/Admin/Usuarios'
import Pag404 from './pages/Pag404/'

//Rota para usuarios admin
const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAdmin() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

//Rota para usuarios logados
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/signIn", state: { from: props.location } }} />
      )
    }
  />
);

//Rota para usuarios nao logados
const UnloggedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <UnloggedRoute path="/signIn" component={SignIn} />
      <UnloggedRoute path="/signup" component={SignUp} />
      <PrivateRoute path="/adquirirPlano" component={AdquirirPlano} />
      <PrivateRoute path="/cadastroAvaliacao" component={CadastroAvaliacao} />
      <PrivateRoute path="/cadastroPesquisado" component={CadastroPesquisado} />
      <PrivateRoute path="/avaliacoes" component={Avaliacoes} />
      <PrivateRoute path="/PesquisadosAval/:chave" component={PesquisadosAval} />
      <PrivateRoute path="/questsPlano/:id" component={QuestsPlano} />
      <PrivateRoute path="/RespondeAval/:chave" component={RespondeAval} />
      <PrivateRouteAdmin path="/perfis" component={Perfis} />
      <PrivateRouteAdmin path="/RegisterProfile" component={RegisterProfile} />
      <PrivateRouteAdmin path="/signupAdmin" component={SignupAdmin} />
      <PrivateRouteAdmin path="/usuarios" component={Usuarios} />
      <Route path="*" component={Pag404} />
    </Switch>
  </BrowserRouter>
);

export default Routes;