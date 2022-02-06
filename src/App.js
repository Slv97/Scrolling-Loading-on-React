import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [photos, setPhotos] = useState([]);
    const [currenyPage, setCurrentPage] = useState(1); //1-500 pages
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        if (fetching) {
            console.log('fetching');
            axios
                .get(
                    `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currenyPage}`
                )
                .then((response) => {
                    setPhotos([...photos, ...response.data]);
                    setCurrentPage((prevState) => prevState + 1);
                    setTotalCount(response.headers['x-total-count'])
                })
                .finally(() => setFetching(false));
        }
    }, [fetching]);

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("scroll", handleScroll);
        }
    }, [totalCount]);

    const handleScroll = (e) => {
        let pageScrollheight = e.target.documentElement.scrollHeight;
        let visibleArea = e.target.documentElement.scrollTop;
        let windowHeight = window.innerHeight;
        console.log(photos.length)
        if (pageScrollheight - (visibleArea + windowHeight) < 100 && photos.length < totalCount) {
            console.log("scroll");
            setFetching(true);
        }
        //console.log("scrollHeight", e.target.documentElement.scrollHeight);
        //console.log("scrollTop", e.target.documentElement.scrollTop);
        //console.log("innerHeight", window.innerHeight);
    };
    return (
        <div className="app">
            {photos.map((photo) => (
                <div className="photo" key={photo.id}>
                    <div className="title">
                        {photo.id}. {photo.title}
                    </div>
                    <img src={photo.thumbnailUrl} alt={photo.title} />
                </div>
            ))}
        </div>
    );
}

export default App;
