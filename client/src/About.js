import React from 'react';
import './About.css';
import PaymentSecurityPolicy from './PaymentSecurityPolicy';

const About = () => {
    return (
        <div className='box-about'>
            <div className='text-about'>
                <h1>Sobre Nós</h1>
                <p>Aqui na nossa loja, nos preocupamos em oferecer produtos de alta qualidade para nossos clientes. Nosso objetivo é sempre atender às necessidades dos nossos clientes e oferecer a melhor experiência possível.</p>
                <p>Estamos no mercado há mais de 10 anos e desde então, temos nos dedicado em oferecer um excelente serviço ao cliente e produtos de alta qualidade. Nós nos orgulhamos de fornecer produtos de fabricantes confiáveis, para garantir a satisfação dos nossos clientes.</p>
                <p>Se você tiver alguma dúvida ou sugestão, não hesite em entrar em contato conosco através da nossa página de Contato.</p>
            </div>
            <PaymentSecurityPolicy />
        </div>
    );
};

export default About;