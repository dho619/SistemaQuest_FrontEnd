import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag"

import api from '../../../services/api';
import { setLinkAtual } from '../../../utils/DestacaLink'
import { isAdmin } from '../../../services/auth';


import iconDel from '../../../assets/IconDel.png';
import iconEdt from '../../../assets/IconEdt.png';
import iconNew from '../../../assets/IconNew.png';
import Form from '../../../componentsCSS/Form_Listagem';

export default class Usuarios extends Component {
    // usa-se o state para poder acessar essas variaveis externamente
    state = { //state e um objeto
        Users: [],
        page: 0,
        UserInfo: {}
    }

    //componentDidMount executa assim que e criado a pagina
    componentDidMount() { //nao clk o "() => ", pq e uma funcao da proprio js
        setLinkAtual('usuarios')
        this.loadUsers();
    }
 
    loadUsers = async (page = 0) => {
        await api.query({
            query: gql`
                query{
                    usuarios{
                     	id nome email 
                        ativo created_at updated_at perfis {rotulo}
	                }
                }
            `
        }).then(response => {
            //Simular uma paginasao, ate eu coloca-la no backend ou retirar
            var Users = []
            var aux = []
            for(let user of response.data.usuarios){
                if(aux.length < 10){
                    aux.push(user)
                }else {
                    Users.push(aux)
                    aux = []
                }
            }
            if (aux.length > 0) Users.push(aux)
            this.setState({ Users: Users[page], UserInfo: {pages: Users.length-1}});
        }).catch(e => {
            console.log(e)
        })       
    };  

    prevPage = () => {
        const { page } = this.state;

        //se esta na primeira pagina, ja retorna sem fazer nada
        if (page === 0) return;

        let pageNumber = page - 1;

        this.setState({page: pageNumber})
        
        this.loadUsers(pageNumber);
    }

    nextPage = () => {
        const { page, UserInfo} = this.state;
        
        //se esta na ultima pagina, ja retorna sem fazer nada
        if (page === UserInfo.pages) return;

        const pageNumber = page + 1;

        this.setState({page: pageNumber})
        this.loadUsers(pageNumber);//chamando a funcao de mostrar a pagina
    }

    Deleteuser = async (filtro) => {
        if (isAdmin())  {
            //let confirma = confirm("Deseja realmente apagar esse usuario?")
            // if (!confirma) return null
            api.mutate({
                mutation: gql`
                    mutation(
                        $id: Int
                    ){
                        excluirUsuario (
                            filtro: {
                                id: $id
                            }
                        ){
                            id nome email
                        }
                    }
                `,
                variables: {
                    id: filtro.id,
                }
            }).then(resultado => {
                console.log(resultado.data.excluirUsuario)
            }).catch(e => {
                console.log(e)
            })
            const { page } = this.state
            this.loadUsers(page)
        }else {
            alert('Você não tem essa permissão!');
        }
    }

    //render sempre executa novamente, se alguma variavel do state for alterada
    render() {
        const { Users, page,UserInfo} = this.state; //desistruturando

        //a key no h2 e passada, pq o react pede que tenha uma key unica pra cada item da iteracao
        return  (
            <Form onSubmit={() => {}}> 
                <div className='header'>
                    <h1>Lista de usuarios:</h1>{/*alt='' e por questao de acessibilidade, ele fornece o que e aquela imagem, para deficientes visuais ou navegacao apenas de texto*/}
                    <Link to={`/signupAdmin`} title='Novo Usuario' className='btIcon'><img alt='Imagem Novo Usuario' src={iconNew}/></Link>    
                </div>
                {//aqui codigo javascript, apos "=> (" volta a ser html
                    Users.map(user => (
                            <article key={user.id}>
                                <strong>{user.nome}</strong>
                                <p>{user.email}</p>
                                <p>Ativo: {user.ativo?'Sim':'Não'}</p>
                                <p>Criado em {user.created_at}</p>
                                <p>Ultima atualização em {user.updated_at}</p>
                                <Link to={`/users/${user.id}`}>Acessar</Link>
                                <div className='buttons'>  {/*alt='' e por questao de acessibilidade, ele fornece o que e aquela imagem, para deficientes visuais ou navegacao apenas de texto*/}
                                    <Link to={`/updateusers/${user.id}`} title='Editar' className='btIcon'><img alt='Imagem Editar Usuario' src={iconEdt}/></Link>
                                    <button title='Deletar' className='btIcon' onClick= {() => {this.Deleteuser({id: user.id});}}><img alt='Imagem Deletar Usuario' src={iconDel}/></button>
                                </div>
                            </article>
                    ))
                }
                <div className="actions">
                    <button disabled={page === 0} onClick={this.prevPage}>Anterior</button>
                    <button disabled={UserInfo.pages === -1 || UserInfo.pages === undefined ||  page === UserInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </Form>

            
        )
    }
}