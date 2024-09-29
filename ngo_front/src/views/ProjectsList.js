import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function ProjectList() {

    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects()
        setLoading(false)
    }, [])

    async function fetchProjects() {
        await fetch(`http://${apiUrl}/api/projects/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setProjects(data)
                })
            }
        })
    }


    return (
        <>
            {!loading ? (
                <div className="container pt-3">
                    <div className="row">
                        {projects.map((project) => (
                            <div className="col-2 m-2 border rounded text-center" key={project.id}>
                                <Link className="text-decoration-none text-black" to={`/projects/${project.id}`}>
                                    <p>{project.name}</p>
                                    <p>{project.bio}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (<><p>Loading</p></>)}
        </>
    );
}

export default ProjectList;