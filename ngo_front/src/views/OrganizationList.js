import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function OrganizationList() {

    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [ngos, setNgos] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const ngosData = await fetchNgos();
            const companiesData = await fetchCompanies();

            setNgos(ngosData);
            setCompanies(companiesData);

            setLoading(false);
        };
        fetchData();
    }, []);

    async function fetchNgos() {
        const response = await fetch(`http://${apiUrl}/api/ngos/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });
        if (response.status === 200) {
            return await response.json();
        }
        return [];
    }

    async function fetchCompanies() {
        const response = await fetch(`http://${apiUrl}/api/companies/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });
        if (response.status === 200) {
            return await response.json();
        }
        return [];
    }

    return (
        <>
            {!loading ? (
                <>
                    <div className="container">
                        <div className="display-6">Firmy</div>
                        <hr/>
                        <div className="row">
                            {companies.map((company) => (
                                <div className="col-4 m-2 text-center border" key={company.id}>
                                    <Link className="text-decoration-none text-dark" to={`/companies/${company.id}`}>
                                        <img width="20%" src={company.image} alt=""/>
                                        <p>{company.name}</p>
                                        <p>{company.localization}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="display-6">NGO</div>
                        <hr/>
                        <div className="row">
                            {ngos.map((ngo) => (
                                <div className="col-4 m-2 text-center border" key={ngo.id}>
                                    <Link className="text-decoration-none text-dark" to={`/ngos/${ngo.id}`}>
                                        <p>{ngo.name}</p>
                                        <p>{ngo.localization}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <><p>Loading...</p></>
            )}
        </>
    );

}

export default OrganizationList;
