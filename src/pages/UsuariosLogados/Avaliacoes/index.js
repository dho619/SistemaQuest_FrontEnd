import React, { Component } from "react";
import gql from "graphql-tag"

import api from '../../../services/api';
import { getUsuarioLogado } from '../../../services/auth';
import { setLinkAtual } from '../../../utils/DestacaLink'
import { criptografar } from '../../../utils/criptografia'
import MyGrid from "../../../components/Grid";
import { Div } from "../../../componentsCSS/Exibir_Grid";

export default class Avaliacoes extends Component {
    state = { 
        avaliacoes: [],
    }

    //componentDidMount executa assim que e criado a pagina
    async componentDidMount() { 
        setLinkAtual('avaliacoes')
        this.loadAvaliacoes()
    }

    loadAvaliacoes = async () => {
        const { id } = await getUsuarioLogado()
        api.query({
          query: gql`
            query(
              $id: Int
            ){
                schedulesUsuario(filtro: {id: $id}){
                    id desc chave dataInicio dataFim
                    dataInicioFormatada dataFimFormatada 
                    questionario { nome }
                }
            }
          `,
          variables: {
            id,
          }
        }).then(response => {
          let avaliacoes = response.data.schedulesUsuario
          //para facilitar na hora de passar para a grid
          avaliacoes.map(a => a.questionario = a.questionario.nome)
          this.setState({avaliacoes})
        }).catch(e => console.log(e))
    }

    HANDLE_ROW_DOUBLE_CLICK = (row) => {
        console.log(row)
        let obj={CH:row.chave,PI:'1V2XS'}
        window.location.href= `/PesquisadosAval/${criptografar(obj)}`;
    }

    render() {
        const columns = [
            { id: 'chave',          label: 'Chave',         minWidth: 170 },
            { id: 'desc',           label: 'Descrição',     minWidth: 170 },
            { id: 'questionario',   label: 'Questionario',  minWidth: 170 },
            { id: 'dataInicioFormatada',   label: 'Data Inicio',  minWidth: 170, align: 'right' },
            { id: 'dataFimFormatada',   label: 'Data Fim',  minWidth: 170,  align: 'right'},
        ]
        const {avaliacoes} = this.state
        return (
            <Div>
                <header>
                    <h1>Suas Avaliações: </h1>
                </header>
                <MyGrid
                    orderColumn = 'dataInicioFormatada'
                    order = 'asc'// ou desc
                    columns={columns}
                    rows={avaliacoes}
                    onDoubleClick={this.HANDLE_ROW_DOUBLE_CLICK}
                    onTouchEnd={this.HANDLE_ROW_DOUBLE_CLICK}
                />
            </Div>
        )
    }
}