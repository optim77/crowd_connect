import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

function Grand() {

    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [grants, setGrants] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const setGrant = await fetchGrant();
            setGrants(setGrant);
            setLoading(false);
        };
        fetchData();
    }, []);

    async function fetchGrant() {
        const response = await fetch(`http://${apiUrl}/api/grants/${id}/`, {
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

    return(
        <>
            {!loading ? (
                <>
                    <div className="container pt-3">
                        <div>
                            <div className="row">
                                <div className="col-6">
                                    <p className="display-6">{grants.name}</p>
                                </div>
                                <div className="col-6 text-end">
                                    <p>Czas projektu: {grants.start_date}-{grants.end_date}</p>
                                </div>
                            </div>

                            <hr/>
                            <p>{grants.conditions}</p>
                        </div>
                        <div>
                            <hr/>
                            <p>Budżet: {grants.budget} PLN</p>
                            <p>Fundator: <Link className="text-decoration-none text-dark" to={`/companies/${grants.company.id}`}>{grants.company.name}</Link> </p>

                        </div>

                    </div>


                </>
            ) : (<><p>Loading</p></>)}
        </>
    )
}

export default Grand;