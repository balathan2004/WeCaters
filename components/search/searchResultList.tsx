import { SearchableDocs } from "../interfaces/shared";
import React, { FC } from "react";
import styles from "../../styles/search.module.css";

interface Props {
  data: SearchableDocs;
}

const ResultCard: FC<Props> = ({ data }) => {
  console.log(data);
  return (
    <a href={`/profile/${data.uid}`}>
      <article className={styles.card}>
        <div className={styles.card_left}>
          <img src={data.profile_url ? data.profile_url : ""}></img>
        </div>
        <div className={styles.card_right}>
          <p>{data.company_name}</p>
          <pre>
            {data.district} , {data.state}
          </pre>
        </div>
      </article>
    </a>
  );
};

export default ResultCard;
