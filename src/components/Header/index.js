import React, { Component } from 'react';


//Importacoes de outros arquivos
import { getUsuarioLogado, isAuthenticated, logout, isAdmin} from '../../services/auth';
import { highlightsElement, getLinkAtual, setLinkAtual } from '../../utils/DestacaLink'

//importando o css
import "./styles.css";

//import imagens
import iconLogin from '../../assets/IconLogin.png';
import iconLogout from '../../assets/IconLogout.png';

//quando abre a pagina, colocar o icone e descricao correto de login ou logout
var icon = isAuthenticated()?iconLogout:iconLogin;
var iconDesc = isAuthenticated()?'Logout':'Login';
var LinkLogin = isAuthenticated()?'/':'/signIn';

// cria um "componente", tipo uma classe, mas nao tem estado
export default class Header extends Component {
    state = {
        usuario: {},
        classLink: {},
    }

    //componentDidMount executa assim que e criado a pagina
    componentDidMount() { //nao clk o "() => ", pq e uma funcao da proprio js
        let usuarioLogado = getUsuarioLogado()
        usuarioLogado && this.setState({usuario: usuarioLogado})
        this.setState({admin: isAdmin()})
        this.setState({logado: isAuthenticated()})
        setTimeout(aux, 10)
        function aux(){
            let link_atual = getLinkAtual()
            if(link_atual){ 
                highlightsElement(link_atual)
            }
        }
    }

    /*
    faz a alternancia do login e logout e dependendo do que foi clicado
    ou vai pra pagina de login ou desloga a conta apenas
    */
    loginOrLogout = () => {
        if (isAuthenticated()){
            logout();
            icon = iconLogin;
            iconDesc = 'Logout';
            LinkLogin = "/";
            this.trocarLinkDestacado('nenhum')
        } else {
            icon = iconLogout;
            iconDesc = 'Login';
            LinkLogin = "/signIn";
            this.trocarLinkDestacado('signIn')
        }
    }

    trocarLinkDestacado = (link_atual) => {
        setLinkAtual(link_atual)
    }

    render() {
        const {logado, admin} = this.state
        return  (
            <header id='menu' className='Myheader'>
                <h1 className="float-l">
                    <a href="/" onClick={() => {this.trocarLinkDestacado('nenhum')}} alt="Titulo do Site">GurrenLagann</a>
                </h1>
                
                <input type="checkbox" id="control-nav" />
                <label htmlFor="control-nav" className="control-nav"></label>
                <label htmlFor="control-nav" className="control-nav-close"></label>
        
                <nav className="float-r">
                    <ul id='list-auto' className="list-auto">
                        <li>
                            {logado && !admin && <a id='avaliacoes' onClick={() => {this.trocarLinkDestacado('avaliacoes')}} href="/avaliacoes">Avaliações</a>}
                        </li>
                        <li>
                            {logado && !admin && <a id='adquirirPlano' onClick={() => {this.trocarLinkDestacado('adquirirPlano')}} href="/adquirirPlano">Adquirir Planos</a>}
                        </li>
                        <li>
                            {logado && !admin && <a id='cadastroAvaliacao' onClick={() => {this.trocarLinkDestacado('cadastroAvaliacao')}} href="/cadastroAvaliacao">Cadastrar Nova Avaliação</a>}
                        </li>
                        <li>
                            {logado && !admin && <a id='cadastroPesquisado' onClick={() => {this.trocarLinkDestacado('cadastroPesquisado')}} href="/cadastroPesquisado">Teste de Avaliação</a>}
                        </li>
                        <li>
                            {!logado && <a id='signIn' onClick={() => {this.trocarLinkDestacado('signIn')}} href="/signIn">Login</a>}
                        </li>
                        <li>
                            {!logado && <a id='signUp' onClick={() => {this.trocarLinkDestacado('signUp')}} href="/signUp">Novo Registro</a>}
                        </li>
                        <li>
                            {admin && <a id='signupAdmin' onClick={() => {this.trocarLinkDestacado('signupAdmin')}} href="/signupAdmin">Novo Registro</a>}
                        </li>
                        <li>
                            {admin && <a id='RegisterProfile' onClick={() => {this.trocarLinkDestacado('RegisterProfile')}} href="/RegisterProfile">Novo Perfil</a>}
                        </li>
                        <li>
                            {admin && <a id='usuarios' onClick={() => {this.trocarLinkDestacado('usuarios')}} href="/usuarios">Usuarios</a>}
                        </li>
                        <li>
                            {admin && <a id='perfis' onClick={() => {this.trocarLinkDestacado('perfis')}} href="/perfis">Perfis</a>}
                        </li>
                        <li>                                 
                            <a  
                                href={LinkLogin} 
                                title={iconDesc}
                                className='IconLogInLogout' 
                                onClick= {() => {this.loginOrLogout();}}>
                                <img src={icon} alt="Imagem Login ou Logout"></img>
                                <h4>{iconDesc}</h4>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
            
        )
    }
}