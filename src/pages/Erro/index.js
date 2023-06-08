import { Link } from 'react-router-dom';
import './erro.css'

function Erro() {
    return (
        <div className="page_center">
            <h1 className="erro_number">404</h1>
            <h2>Página não encontrada!</h2>
            <Link to='/' className='erro_home'>Página inicial</Link>
        </div>
    )
}

export default Erro;