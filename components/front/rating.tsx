import React, { FC, useState } from "react";
import { faStar as faRegularstar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/blog.module.css";
const ratingMessages = [
  "Disappointed",
  "Needs Improvement",
  "Average",
  "Good",
  "Excellent",
];
const Rating: FC = () => {
  const [count, setCount] = useState(3);
  const [placeholderMessage, setPlaceholderMessage] = useState(
    ratingMessages[count - 1]
  );

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    // const starName = event.target.getAttribute("data-name");
    const value = event.currentTarget.getAttribute(
      "data-name"
    ) as unknown as number;
    setCount(value);
    setPlaceholderMessage(ratingMessages[value - 1]);
  };

  const handleSubmit = () => {
    console.log("value is ", count);
  };

  return (
    <div className={styles.rating}>
      <span className={styles.placeholderMessage}>{placeholderMessage}</span>
      <div className={styles.rating_inner}>
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <span onClick={handleClick} key={index} data-name={index}>
              <FontAwesomeIcon
                className={styles.rate_icon}
                icon={count >= index ? faStar : faRegularstar}
              />
            </span>
          );
        })}

        <button onClick={handleSubmit}>Rate</button>
      </div>
    </div>
  );
};

export default Rating;
