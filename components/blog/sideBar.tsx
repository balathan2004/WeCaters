import style from "/styles/sideBar.module.css";
import React, { useState } from "react";
export default function SideBar({ data }) {
  const [provider, setProvider] = useState(data ? data : []);

  const userNames = provider
    .filter((single) => single != undefined)
    .map((single) => {
      return single != undefined ? single : "";
    });

  const [search, setSearch] = useState(null);
  const [results, setResults] = useState(null);

  const handleSearch = (event) => {
    var value = event.target.value.toLowerCase();
    if (value != "") {
      setSearch(value);

      var suggestions = userNames.filter((singleData) =>
        singleData.toLowerCase().includes(value)
      );

      setResults(suggestions);
    } else {
      setResults(null);
    }
  };

  return (
    <>
      <div className={style.sideBar}>
        <div className={style.search}>
          <h2>Search Providers</h2>
          <input onChange={handleSearch} placeholder="Search"></input>
          <ul className={style.results}>
            {!results
              ? null
              : results.map((resultValue) => {
                  return (
                    <a href={`/profile/${resultValue}`} key={resultValue}>
                      <li>@{resultValue}</li>
                    </a>
                  );
                })}
          </ul>
        </div>
      </div>
    </>
  );
}
