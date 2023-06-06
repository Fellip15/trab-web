import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import './AboutUs.css';

const AboutUs = () => {
    return (
        <>
        <Header />
        <div className="about-us-frame content">
            <h1 className="font-title-black">Sobre nós</h1>
            <div className="locate">
                <iframe id="map-usp" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14796.751198878157!2d-47.9136513908343!3d-22.0041141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b870cccdcf09dd%3A0x9fd71af8a6c23c26!2sUSP%20-%20Universidade%20de%20S%C3%A3o%20Paulo%20Campus%20de%20S%C3%A3o%20Carlos!5e0!3m2!1spt-BR!2sbr!4v1682962429083!5m2!1spt-BR!2sbr" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <div className="map-text">
                    <h2>São Carlos:</h2>
                    <p>A sede para nossa empresa é a Universidade de São Paulo, campus São Carlos, onde tudo se deu início em uma disciplina de desenvolvimento web.
                    <br/>
                    Com isso resolvemos criar esse site que está sendo usado por você e dar seguimento da forma em que decidimos.
                    <br/><br/>
                    São Carlos é uma cidade localizada no interior do estado de São Paulo, com uma população de aproximadamente 250.000 habitantes. Conhecida como a "Capital da Tecnologia", a cidade possui um importante polo de pesquisa e desenvolvimento científico, com diversas universidades e centros de inovação. Além disso, São Carlos também é reconhecida por sua rica cultura e história, com museus, teatros e festas tradicionais que atraem turistas de todo o país. Com uma localização privilegiada e uma infraestrutura completa, São Carlos é uma cidade vibrante e acolhedora, que oferece qualidade de vida e oportunidades para seus moradores e visitantes.
                    </p>
                </div>
            </div>

            <div className="participantes">
                <h1 className="font-title-black">Participantes:</h1>
                <div className="participantes-container">
                    <div className="participante">
                        <img className="img-participante" src="img/participantes/img-felps.jpg" alt="Imagem participante"/>
                        <h3 className="participante-nome">Fellip Silva Alves (Felps)</h3>
                        <div className="participante-contacts">
                            <a href=""><img className="participante-contact" src="img/icons/github.png"/></a>
                            <a href=""><img className="participante-contact" src="img/icons/linkedin.png"/></a>
                            <a href=""><img className="participante-contact" src="img/icons/facebook.png"/></a>
                        </div>
                    </div>
                    <div className="participante">
                        <img className="img-participante" src="img/participantes/img-natal.jpg" alt="Imagem participante"/>
                        <h3 className="participante-nome">Gabirel Natal Coutinho (Natal)</h3>
                        <div className="participante-contacts">
                            <a href="https://github.com/natalzera"><img className="participante-contact" src="img/icons/github.png"/></a>
                            <a href=""><img className="participante-contact" src="img/icons/linkedin.png"/></a>
                            <a href=""><img className="participante-contact" src="img/icons/facebook.png"/></a>
                        </div>
                    </div>
                    <div className="participante">
                        <img className="img-participante" src="img/participantes/img-tigre.jpg" alt="Imagem participante"/>
                        <h3 className="participante-nome">João Vitor Tigre Almeida (Tigre)</h3>
                        <div className="participante-contacts">
                            <a href=""><img className="participante-contact" src="img/icons/github.png"/></a>
                            <a href=""><img className="participante-contact" src="img/icons/linkedin.png"/></a>
                            <a href=""><img className="participante-contact" src="img/icons/facebook.png"/></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="objetivos">
                <h1 className="font-title-black">Objetivos</h1>
                <p className="font-inter-black">O objetivo deste site de vendas é oferecer aos seus usuários uma experiência de compra fácil e agradável, com uma ampla seleção de produtos de qualidade a preços acessíveis. Buscamos criar um ambiente virtual que transmita confiança e segurança aos clientes, fornecendo informações claras sobre os produtos e suas características. Além disso, nossa intenção é garantir uma comunicação eficiente com os clientes, oferecendo suporte para quaisquer dúvidas ou questões que possam surgir durante o processo de compra. Esperamos que o site se torne uma referência em sua área de atuação, sendo reconhecido pela qualidade dos serviços oferecidos e pelo compromisso com a satisfação dos clientes.
                </p>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default AboutUs;