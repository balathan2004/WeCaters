import React, { FC, useState } from "react";
import { faStar as faRegularstar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/blog.module.css";
import { userInterface } from "../interfaces/shared";
import { reviewInterface } from "../interfaces/shared";
import SendData from "../fetch/sendData";
const ratingMessages = [
  "Disappointed",
  "Needs Improvement",
  "Average",
  "Good",
  "Excellent",
];

interface Props {
  userData: userInterface;
  toID: string;
  changeTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}
const Rating: FC<Props> = ({ userData, toID, changeTrigger }) => {
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

  const handleSubmit = async () => {
    const data: reviewInterface = {
      from: userData.uid,
      to: toID,
      rating: count,
    };
    if (userData.account_type == "personal") {
      const response = await SendData({
        route: "/api/other_actions/review",
        data: data,
      });
      if (response?.status == 200) {
        changeTrigger((prev) => !prev);
      }
    }
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
