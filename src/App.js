import { React, useState, useEffect } from "react";
import NewsList from "./NewsList";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SpinnerAnimation from "./SpinnerAnimation";
import Pagination from "./Pagination";

function App() {
  const [news, setNews] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [previousSearchInput, setPreviousSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [nbOfPages, setNbOfPages] = useState(0);

  const downloadNews = async () => {
    setPreviousSearchInput(searchInput);
    try {
      setLoading(true);
      const res = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${searchInput}&hitsPerPage=30&page=${currentPage}`
      );
      setNews(res.data.hits);
      setCurrentPage(res.data.page);
      setNbOfPages(res.data.nbPages);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchInput === previousSearchInput) return;
    downloadNews();
    setSearchInput("");
  };

  // useEffect not needed since handleSearch is calling the downloadNews function when form is submited
  // useEffect(() => downloadNews(), []);

  return (
    <div className="App">
      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          onChange={(event) => setSearchInput(event.target.value)}
          value={searchInput}
        ></input>
      </form>
      {loading ? <SpinnerAnimation /> : ""}
      <NewsList news={news} />
      <Pagination page={currentPage} callback={setCurrentPage} />
    </div>
  );
}

export default App;
