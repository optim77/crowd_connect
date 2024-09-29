import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

function Ngo() {

    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [ngo, setNgo] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const ngoData = await fetchNGO();
            setNgo(ngoData);
            setLoading(false);
        };
        fetchData();
    }, []);

    async function fetchNGO() {
        const response = await fetch(`http://${apiUrl}/api/ngos/${id}/`, {
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
                                    <p className="display-5 mt-3">{ngo.name}</p>
                                </div>
                                <div className="col-6 text-end">
                                    <img width='30%' src={ngo.image} alt=""/>
                                </div>
                                <div>

                                </div>

                            </div>

                            <hr/>
                            <p>{ngo.bio}</p>
                        </div>
                        <div>
                            <hr/>
                            <p>Dane</p>
                            <p className="fw-bold">{ngo.phone ? 'Telefon: '+ ngo.phone : ''}</p>
                            <p>Mail: {ngo.mail}</p>
                            <p>Lokalizacja: {ngo.localization}</p>
                            <p>Miasto: {ngo.city}</p>
                            <p>Wojewódzwto: {ngo.voivodeship}</p>
                            <p>Kod pocztowy: {ngo.zip}</p>
                            <p>{ngo.krs ? 'KRS: ' + ngo.krs : ''}</p>
                        </div>

                    </div>


                </>
            ) : (<><p>Loading</p></>)}
        </>
    )
}

export default Ngo;