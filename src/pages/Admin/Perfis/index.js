import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag"

import api from '../../../services/api';
import { isAdmin } from '../../../services/auth';
import { setLinkAtual } from '../../../utils/DestacaLink'

import iconDel from '../../../assets/IconDel.png';
import iconEdt from '../../../assets/IconEdt.png';
import iconNew from '../../../assets/IconNew.png';
import Form from '../../../componentsCSS/Form_Listagem';

export default class Perfis extends Component {
    // usa-se o state para poder acessar essas variaveis externamente
    state = { //state e um objeto
        Perfis: [],
        page: 0,
        PerfilInfo: {}
    }

    //componentDidMount executa assim que e criado a pagina
    componentDidMount() { //nao clk o "() => ", pq e uma funcao da proprio js
        this.loadPerfis();
        setLinkAtual('perfis')
    }
 
    loadPerfis = async (page = 0) => {
        await api.query({
            query: gql`
                query{
                    perfis{
                     	id nome rotulo 
	                }
                }
            `
        }).then(response => {
            //Simular uma paginasao, ate eu coloca-la no backend ou retirar
            var Perfis = []
            var aux = []
            for(let Perfil of response.data.perfis){
                if(aux.length < 10){
                    aux.push(Perfil)
                }else {
                    Perfis.push(aux)
                    aux = []
                }
            }
            if (aux.length > 0) Perfis.push(aux)
            this.setState({ Perfis: Perfis[page], PerfilInfo: {pages: Perfis.length-1}});
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
        
        this.loadPerfis(pageNumber);
    }

    nextPage = () => {
        const { page, PerfilInfo} = this.state;
        
        //se esta na ultima pagina, ja retorna sem fazer nada
        if (page === PerfilInfo.pages) return;

        const pageNumber = page + 1;

        this.setState({page: pageNumber})
        this.loadPerfis(pageNumber);//chamando a funcao de mostrar a pagina
    }

    DeletePerfil = async (filtro) => {
        if (isAdmin())  {
            //let confirma = confirm("Deseja realmente apagar esse usuario?")
            // if (!confirma) return null
            api.mutate({
                mutation: gql`
                    mutation(
                        $id: Int
                    ){
                        excluirPerfil (
                            filtro: {
                                id: $id
                            }
                        ){
                            id nome rotulo
                        }
                    }
                `,
                variables: {
                    id: filtro.id,
                }
            }).then(resultado => {
                console.log(resultado.data.excluirPerfil)
            }).catch(e => {
                console.log(e)
            })
            const { page } = this.state
            this.loadPerfis(page)
        }else {
            alert('Você não tem essa permissão!');
        }
    }

    //render sempre executa novamente, se alguma variavel do state for alterada
    render() {
        const { Perfis, page, PerfilInfo} = this.state; //desistruturando

        //a key no h2 e passada, pq o react pede que tenha uma key unica pra cada item da iteracao
        return  (
            <Form onSubmit={() => {}}> 
                <div className='header'>
                    <h1>Lista de perfis:</h1>{/*alt='' e por questao de acessibilidade, ele fornece o que e aquela imagem, para deficientes visuais ou navegacao apenas de texto*/}
                    <Link to={`/RegisterProfile`} title='Novo Perfis' className='btIcon'><img alt='Imagem Novo Perfis' src={iconNew}/></Link>    
                </div>
                {//aqui codigo javascript, apos "=> (" volta a ser html
                    Perfis.map(Perfil => (
                            <article key={Perfil.id}>
                                <strong>ID: {Perfil.id}</strong>
                                <br/>
                                <strong>Nome: {Perfil.nome}</strong>
                                <br/>
                                <strong>Rotulo: {Perfil.rotulo}</strong>
                                <Link to={`/Perfis/${Perfil.id}`}>Acessar</Link>
                                <div className='buttons'>  {/*alt='' e por questao de acessibilidade, ele fornece o que e aquela imagem, para deficientes visuais ou navegacao apenas de texto*/}
                                    <Link to={`/updatePerfis/${Perfil.id}`} title='Editar' className='btIcon'><img alt='Imagem Editar Perfis' src={iconEdt}/></Link>
                                    <button title='Deletar' className='btIcon' onClick= {() => {this.DeletePerfil({id: Perfil.id});}}><img alt='Imagem Deletar Perfis' src={iconDel}/></button>
                                </div>
                            </article>
                    ))
                }
                <div className="actions">
                    <button disabled={page === 0} onClick={this.prevPage}>Anterior</button>
                    <button disabled={PerfilInfo.pages === -1 || PerfilInfo.pages === undefined || page === PerfilInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </Form>

            
        )
    }
}