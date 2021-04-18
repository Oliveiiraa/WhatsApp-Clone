import React from 'react';
import './ChatIntro.css';

export default () => {
    return(
        <div>
            <div className="chatIntro">
                <img src="https://web.whatsapp.com/img/intro-connection-hq-light_9466a20e6d2921a21ac7ab82419be157.jpg" alt="WhatsApp Conecte"/>
                <h1>Mantenha seu celular conectado</h1>
                <h2>O WhatsApp conecta ao seu telefone para sincronizar suas mensagens! <br/> Para reduzir o uso de dados, conecte seu telefone a uma rede Wi-Fi.</h2>
            </div>
        </div>
    );
}