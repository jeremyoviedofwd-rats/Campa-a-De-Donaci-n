import { TurtleIcon } from '../common/Icons';

function Hero() {
    return (
        <section className="hero">
            <h1><TurtleIcon size={32} /> Protejamos a las tortugas marinas</h1>
            <p>
                Cada año millones de tortugas enfrentan peligros por contaminación y pesca
                indiscriminada. ¡Únete a nuestra misión para salvarlas!
            </p>
        </section>
    );
}

export default Hero;
