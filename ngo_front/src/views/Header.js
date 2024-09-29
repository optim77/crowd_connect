import '../style/style.css'
import {Link} from "react-router-dom";
function Header(){
    return(
        <div className="pt-3 pb-3 ngo-header">
            <div className="row">
                <div className="col-2 text-left text-center">
                    <Link to={"/"}>
                        <img width="70%" src="NGO2.png" alt=""/>
                    </Link>

                </div>
                <div className="col-8">
                    <div className="row text-center">
                        <Link className="col-2 mt-2 text-dark text-decoration-none" to="/">HOME</Link>
                        <Link className="col-2 mt-2 text-dark text-decoration-none" to="/organizations_list">ORGANIZACJE</Link>
                        <Link className="col-2 mt-2 text-dark text-decoration-none" to="/projects_list">PROJEKTY</Link>
                        <Link className="col-2 mt-2 text-dark text-decoration-none" to="/find">ZNAJDŹ SIĘ</Link>
                        <Link className="col-2 mt-2 text-dark text-decoration-none" to="/contact">KONTAKT</Link>
                        <Link className="col-2 mt-2 text-dark text-decoration-none" to="/faq">FAQ</Link>
                    </div>
                </div>
                <div className="col-1 text-center mt-2">
                    <img width="30%" src="/fb.svg" alt="image" />
                    <img width="30%" src="/in.svg" alt="image" />

                </div>
            </div>
    <hr/>
        </div>
    )
}
export default Header;