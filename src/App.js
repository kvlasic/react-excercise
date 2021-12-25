import { React, useState, useEffect } from "react";
import NewsList from "./NewsList";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SpinnerAnimation from "./SpinnerAnimation";

function App() {
  const [news, setNews] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [previousSearchInput, setPreviousSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const downloadNews = async () => {
    setPreviousSearchInput(searchInput);
    try {
      setLoading(true);
      const data = await axios
        .get(
          `http://hn.algolia.com/api/v1/search?query=${searchInput}&hitsPerPage=30`
        )
        .then((res) => setNews(res.data.hits));
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    console.log(news);
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
    </div>
  );
}

export default App;
