import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="home-page">
            <h1>CarDetailing</h1>
            <p>Witamy w naszym serwisie CarDetailing, gdzie oferujemy najlepsze usługi detalingowe dla Twojego pojazdu!</p>
            <Link to="/services" className="cta-button">Nasze usługi</Link>
        </div>
    );
}

export default Home;