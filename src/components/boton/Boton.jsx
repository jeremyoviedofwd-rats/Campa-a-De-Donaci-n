import './Boton.css';

function Boton({ texto, onClick, variante = 'primario' }) {
    return (
        <button className={`boton boton-${variante}`} onClick={onClick}>
            {texto}
        </button>
    );
}

export default Boton;
