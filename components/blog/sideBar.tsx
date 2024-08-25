import style from "/styles/sideBar.module.css";
import React, { useState,FC } from "react";

interface props{
  data:{
    name: string,
uid: string;
  }[]
  
}

 const SideBar:FC<props>=({ data })=> {
  const [provider, setProvider] = useState(data ? data : []);
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<{
    name: string,
uid: string;
  }[]>();

  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    var value = event.target.value.toLowerCase();
    if (value != "") {
    setSearch(value);
    console.log(value);
      var suggestions = provider.filter((singleData) =>
        singleData.name.toLowerCase().includes(value) 
      );
      console.log(suggestions);

      setResults(suggestions);
    } else {
      setResults([]);
    }
  };

  return (
    <>
      <div className={style.sideBar}>
        <div className={style.search}>
          <h2>Search Businesses</h2>
          <input onChange={handleSearch} placeholder="Search"></input>
          <ul className={style.results}>
            {!results
              ? null
              : results.map((resultValue) => {
                  return (
                    <a href={`/profile/${resultValue.uid}`} key={resultValue.uid}>
                      <li>@{resultValue.name}</li>
                    </a>
                  );
                })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar