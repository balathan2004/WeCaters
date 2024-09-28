import React, { FC, useState, useContext } from "react";
import SendData from "../fetch/sendData";
import style from "/styles/professional_profile.module.css";
import { ReplyContext } from "../providers/reply_provider";
import { userInterface } from "../interfaces/shared";

interface Props {
  userData: userInterface;
}
const Report: FC<Props> = ({ userData }) => {
  const [textValue, setTextValue] = useState("");
  const { setReply } = useContext(ReplyContext);
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (textValue != "" && userData) {
      console.log(textValue);
      const response = await SendData({
        route: "/api/other_actions/report",
        data: {
          report: textValue,
          sender: userData.email,
          sendId: userData.uid,
        },
      });
      if (response && response.status == 200) {
        setReply(response.message);
      } else if (response && response.status == 300) {
        setReply(response.message);
      }
    }
  };

  return (
    <div className={style.profile}>
      <form onSubmit={submitForm} className={style.report}>
        <h1>Report Problem</h1>

        <textarea
          onChange={handleInput}
          placeholder="share your issues or suggestions"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Report;
