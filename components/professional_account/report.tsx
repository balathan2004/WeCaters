import React, { FC, useState, useContext } from "react";
import SendData from "../fetch/sendData";
import style from "/styles/professional_profile.module.css";
import { ReplyProvider } from "@/pages/_app";
const Report: FC = () => {
  const [textValue, setTextValue] = useState("");
  const { reply, setReply } = useContext(ReplyProvider);
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (textValue != "") {
      console.log(textValue);
      const response = await SendData({
        route: "/api/other_actions/report",
        data: { report: textValue },
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
