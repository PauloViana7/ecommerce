import React from 'react';
import './Footer.css'


function Footer() {
    return(
        <footer>
        <div className="container-footer">
            <div className="copyright">
                <b> <span>Stop Time</span>. Todos os direitos reservados © Copyright </b>
            </div>
            <div className="credits">
                <b>Desenvolvido por <span> <a href="https://pauloviana.000webhostapp.com/">Paulo Viana</a></span></b>
            </div>
        </div>
    </footer>
    )
}

export default Footer;