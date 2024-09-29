import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

function Project(){
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const projectData = await fetchProject();
            setProject(projectData);
            setLoading(false);
        };
        fetchData();
    }, []);

    async function fetchProject() {
        const response = await fetch(`http://${apiUrl}/api/projects/${id}/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
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
                                    <p className="display-6">{project.name}</p>
                                </div>
                                <div className="col-6 text-end">
                                    <p>Czas projektu: {project.start_date}-{project.end_date}</p>
                                </div>
                                <div>
                                    <p>Fundusze: {project.found} PLN</p>
                                </div>

                            </div>

                            <hr/>
                            <p>{project.bio}</p>

                            <div>
                                <p>Organizowane przez:</p>
                                <p><Link to={`/ngos/${project.ngo[0].id}`}>{project.ngo[0].name}</Link></p>
                            </div>


                        </div>


                    </div>


                </>
            ) : (<><p>Loading</p></>)}
        </>
    )
}

export default Project;