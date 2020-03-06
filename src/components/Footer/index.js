import React from 'react';

import "./styles.css"; //importando o css

// cria um "componente", tipo uma classe, mas nao tem estado
const Footer = () => (
    <footer id="rodape">{/*usado rel="..." em link por questoes de seguranca, ler mais aqui: https://mathiasbynens.github.io/rel-noopener/#hax */}
        <p>Copyright &copy; 2019 - by Geovane Barbosa<br/>
        <a id="link" rel="noopener noreferrer" href="https://www.facebook.com/geovane.barbosa.10" target="_blank">Facebook</a> |
        <a id="link" rel="noopener noreferrer" href="https://br.linkedin.com/in/geovane-barbosa-3b1337150" target="_blank"> Linkedin</a><br/>
            Email: geovanebarbosa@hotmail.com<br/>
            Site para treinamento
        </p>
    </footer>
);

export default Footer;