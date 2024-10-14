import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="home-page">
            <h1>ProDetailing</h1>
            <p>Witamy w naszym serwisie ProDetailing, gdzie znajdą Państwo najlepsze studia detailingowe !</p>
            <Link to="/services" className="cta-button">Wybierz Usługę która cię intersuje </Link>
        </div>
        
    );
    
}

export default Home;