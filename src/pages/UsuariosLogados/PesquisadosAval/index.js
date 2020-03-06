import React, { Component } from "react";
import gql from "graphql-tag"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import api from '../../../services/api';
import { setLinkAtual } from '../../../utils/DestacaLink'
import { descriptografar } from '../../../utils/criptografia'
import MyGrid from "../../../components/Grid";
import { Div } from "../../../componentsCSS/Exibir_Grid";

export default class PesquisadosAval extends Component {
    state = { 
        pesquisados: [],
        chave:''
    }

    //componentDidMount executa assim que e criado a pagina
    async componentDidMount() { 
        setLinkAtual('nenhum')
        await this.loadPesquisadosAvaliacao()
    }

    loadPesquisadosAvaliacao = async () => {
        const obj = descriptografar(this.props.match.params.chave)
        const chave = obj.CH
        this.setState({chave})
        api.query({
            query: gql`
              query(
                $chave: String
              ){
                pesquisadoChave(filtro: {chave: $chave}){
                    id nome email telefone inicioAvaliacaoFormatado
                    pesquisa {
                        id
                        chave
                        resultado
                        # respostas {
                        #     pergunta_id
                        #     resposta
                        # }
                    }
                }
              }
            `,
            variables: {
              chave,
            }
          }).then(response => {
            let pesquisados = response.data.pesquisadoChave
            //facilitar na exibicao
            pesquisados.map(p => p.resultado = p.pesquisa? p.pesquisa.resposta: 'Não finalizou a pesquisa')
            this.setState({pesquisados})
          }).catch(e => console.log(e))
    }

    render() {
        const columns = [
            { id: 'nome',      label: 'Nome',       minWidth: 170 },
            { id: 'resultado', label: 'Resultado',  minWidth: 100 },
            { id: 'email',     label: 'Email',      minWidth: 170 },
            { id: 'telefone',  label: 'Telefone',   minWidth: 170 },
            { id: 'inicioAvaliacaoFormatado', 
              label: 'Inicio da Avaliação',
              minWidth: 170,
              align: 'right',
            }
        ];
        
        const {pesquisados, chave} = this.state
        return (
            <Div>
                <header>
                  <h1>Resposta da chave {chave}: </h1>
                  <button
                    className='btVoltarAval'
                    onClick={() => window.location.href='/avaliacoes'}
                  >
                    <ArrowBackIosIcon/>Voltar
                  </button>
                </header>
                <MyGrid
                    orderColumn = 'inicioAvaliacaoFormatado'
                    order = 'desc'// ou asc
                    columns={columns}
                    rows={pesquisados}
                />
            </Div>
        )
    }
}