import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

function Company() {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [company, setCompany] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    console.log(id)
    useEffect(() => {
        const fetchData = async () => {
            const ngoData = await fetchNGO();
            setCompany(ngoData);
            setLoading(false);

        };
        fetchData();
    }, []);

    async function fetchNGO() {
        const response = await fetch(`http://${apiUrl}/api/companies/${id}/`, {
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
                    <div className="container pt-3">
                        <div>
                            <div className="row">
                                <div className="col-6">
                                    <p className="display-5 mt-3">{company.name}</p>
                                </div>
                                <div className="col-6 text-end">
                                    <img width='30%' src={company.image} alt=""/>
                                </div>
                                <div>

                                </div>

                            </div>

                            <hr/>
                            <p>{company.bio}</p>
                        </div>
                        <div>
                            <hr/>
                            <p>Dane</p>
                            <p className="fw-bold">{company.phone ? 'Telefon: ' + company.phone : ''}</p>
                            <p>Mail: {company.mail}</p>
                            <p>Lokalizacja: {company.localization}</p>
                            <p>Miasto: {company.city}</p>
                            <p>Wojewódzwto: {company.voivodeship}</p>
                            <p>Kod pocztowy: {company.zip}</p>
                            <p>KRS: {company.krs}</p>
                        </div>
                        <hr/>
                        <div className="mb-5">
                            <div>Partnerstwa:</div>
                            {company.partnership.length > 0 ? (
                                company.partnership.map((partner) => (
                                    <div key={partner.id}>
                                        <p><Link className="text-decoration-none text-dark" to={`/ngos/${partner.id}`}>{partner.name}</Link></p>
                                    </div>
                                ))
                            ) : (
                                <p>Brak partnerstw do wyświetlenia.</p>
                            )}
                        </div>


                    </div>


                </>
            ) : (<><p>Loading</p></>)}
        </>
    )
}

export default Company;