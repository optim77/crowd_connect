import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function FindAction() {

    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const [projects, setProjects] = useState([]);
    const [grants, setGrants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Załaduj wszystkie projekty, granty i kategorie przy starcie
        findProjects();
        findGrants();
        fetchCategories();
        setLoading(false);
    }, []);

    // Funkcja do wyszukiwania projektów (wszystkich lub po kategorii)
    async function findProjects(categoryId = null) {
        let url = `http://${apiUrl}/api/projects/`;
        if (categoryId) {
            url += `?category=${categoryId}`;
        }
        await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setProjects(data);
                });
            }
        });
    }

    // Funkcja do wyszukiwania grantów (wszystkich lub po kategorii)
    async function findGrants(categoryId = null) {
        let url = `http://${apiUrl}/api/grants/`;
        if (categoryId) {
            url += `?category=${categoryId}`;
        }
        await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setGrants(data);
                });
            }
        });
    }

    // Funkcja do pobierania wszystkich kategorii
    async function fetchCategories() {
        await fetch(`http://${apiUrl}/api/category-projects/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setCategories(data);
                });
            }
        });
    }

    // Obsługa zmiany kategorii
    function handleCategoryChange(event) {
        const selectedCategoryId = event.target.value;
        setSelectedCategory(selectedCategoryId);

        // Wywołaj wyszukiwanie projektów i grantów na podstawie wybranej kategorii
        if (selectedCategoryId) {
            findProjects(selectedCategoryId);
            findGrants(selectedCategoryId);
        } else {
            // Jeśli nie ma wybranej kategorii, wyświetl wszystkie projekty i granty
            findProjects();
            findGrants();
        }
    }

    return (
        <>
            {!loading ? (
                <div className="container">
                    <div>
                        <div>
                            <label htmlFor="categories">Filtruj po kategoriach</label>
                            <br/>
                            <select name="categories" id="categories" onChange={handleCategoryChange}>
                                <option defaultValue value="">Wszystkie</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <p className="display-6">Projekty:</p>
                        {projects.length > 0 ? (
                            <div className="row"> {/* Przeniosłem tutaj, żeby wszystkie projekty były w jednym wierszu */}
                                {projects.map((project) => (
                                    <div className="col-4 m-2 border rounded text-center" key={project.id}>
                                        <Link className="text-decoration-none text-black" to={`/projects/${project.id}`}>
                                            <p>{project.name}</p>
                                            <p>{project.bio}</p>
                                            <p>Twórca: {project.ngo[0]?.name || 'Brak danych'}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (<p>Brak projektów</p>)}
                    </div>
                    <hr/>
                    <div>
                        <p className="display-6">Granty:</p>
                        {grants.length > 0 ? (
                            <div className="row"> {/* To samo dla grantów */}
                                {grants.map((grant) => (
                                    <div className="col-4 m-2 border rounded text-center" key={grant.id}>
                                        <Link className="text-decoration-none text-black" to={`/grants/${grant.id}`}>
                                            <p>{grant.name}</p>
                                            <p>{grant.conditions}</p>
                                            <p>Sponsor: {grant.company?.name || 'Brak danych'}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (<p>Brak grantów</p>)}
                    </div>
                </div>
            ) : (<><p>Loading</p></>)}
        </>
    );

}

export default FindAction;
