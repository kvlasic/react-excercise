import { React, useState } from "react";
import NewsList from "./NewsList";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SpinnerAnimation from "./SpinnerAnimation";
import Pagination from "./Pagination";
import "./style.css";

function App() {
  const [news, setNews] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [previousSearchInput, setPreviousSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const downloadNews = async () => {
    setPreviousSearchInput(searchInput);
    try {
      setLoading(true);
      const res = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${searchInput}&tags=story&page=${currentPage}&hitsPerPage=20`
      );
      setNews(res.data.hits);
      setLoading(false);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchInput === previousSearchInput) return;
    downloadNews();
    setSearchInput("");
    setCurrentPage(0);
  };

  // useEffect not needed since handleSearch is calling the downloadNews function when form is submited
  // useEffect(() => downloadNews(), []);

  const changePage = (page) => {
    setCurrentPage(page);
    downloadNews();
  };

  return (
    <div className="App">
      {/* Search Form / Spinner when loading*/}
      {loading ? (
        <div className="spinner-column">
          <SpinnerAnimation />
        </div>
      ) : (
        <>
          <form onSubmit={handleSearch} className="form-control">
            <input
              type="text"
              placeholder="Search"
              onChange={(event) => setSearchInput(event.target.value)}
              value={searchInput}
            ></input>
          </form>
        </>
      )}

      <NewsList news={news} />
      <Pagination page={currentPage} nextPage={changePage} />
    </div>
  );
}

export default App;
