import {
  ResponseConfig,
  SearchableDocs,
  SearchPageResponse,
} from "@/components/interfaces/shared";
import React, { FC, useState, useEffect } from "react";
import ResultCard from "@/components/search/searchResultList";
import styles from "../../styles/search.module.css";
import SideBar from "@/components/blog/sideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  data: SearchableDocs[];
}

const searchBy = [
  "username",
  "display_name",
  "company_name",
  "district",
  "state",
];

const Search: FC<Props> = ({ data }) => {
  const [results, setResults] = useState<SearchableDocs[] | null>([]);
  const [searchValue, setSearchValue] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setSearchValue(event.target.value.toLowerCase());
    }
  };

  useEffect(() => {
    if (searchValue && data) {
      setResults(() => {
        return data.filter((obj) =>
          Object.entries(obj).some(
            ([key, value]: [string, string]) =>
              searchBy.includes(key) &&
              value.toLowerCase().includes(searchValue)
          )
        );
      });
    } else {
      setResults(data);
    }
  }, [searchValue]);

  useEffect(() => {
    setResults(data);
  }, []);

  return (
    <div className="container">
      <div className={styles.search}>
        <div className={styles.search_container}>
          <header>
            <input
              type="text"
              autoFocus={true}
              onChange={handleInput}
              placeholder="search"
            />
            <button type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </header>

          <main className={styles.main}>
            {!results
              ? null
              : results.map((item) => {
                  return <ResultCard data={item} />;
                })}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `${process.env.DOMAIN_URL}/api/search/search_request`
      : "http://localhost:3000/api/search/search_request";
  console.log("url", apiUrl);
  const response = await fetch(apiUrl);
  const res: SearchPageResponse = await response.json();
  return {
    props: {
      data: res.resultDocs,
    },
  };
}
