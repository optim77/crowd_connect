import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [categoryOrganization, setCategoryOrganization] = React.useState([]);
    const [randomProjects, setRandomProjects] = React.useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchCategories()
        fetchRandomProjects()
        setLoading(false)
    }, [])

    async function fetchCategories() {
        await fetch(`http://${apiUrl}/api/category-organizations/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setCategoryOrganization(data)
                })
            }
        })
    }

    async function fetchRandomProjects() {
        await fetch(`http://${apiUrl}/api/latest-projects/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setRandomProjects(data)
                })
            }
        })
    }

    return (
        <>
            {!loading ? (
                <div className="container">
                    {/* Pierwsza sekcja z organizacjami */}
                    <div className="row">
                        {categoryOrganization.map((org) => (
                            <div className="col-3" key={org.id}> {/* Dodaj klucz tutaj */}
                                <Link className="text-decoration-none text-dark fs-6" to={`/category-projects/${org.id}`}>
                                    {org.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <hr/>

                    <p>Przykładowe projekty</p>
                    {/* Druga sekcja z projektami */}
                    <div className="row">
                        {randomProjects.map((project) => (
                            <div className="col-4 pt-3" key={project.id}> {/* Dodaj klucz tutaj */}
                                <div className="border rounded text-center">
                                    <Link className="text-decoration-none text-black" to={`/projects/${project.id}`}>
                                        <p>{project.name}</p>
                                    </Link>
                                    <p>{project.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <><p>Loading...</p></>
            )}
        </>
    );

};

export default Home;