import React, { FC } from "react";
import { userInterface } from "../interfaces/shared";
import { userInterfaceCount } from "../interfaces/shared";
interface props {
  data: userInterface;
}

const CompleteProfile: FC<props> = ({ data }) => {
  const count = Math.floor(
    (Object.keys(data).length / userInterfaceCount) * 100
  );

  return (
    <article>
      <h1>Complete your Profile</h1>
      <progress max={100} value={count}></progress>
      <label>{count}% completed</label>
      <a href="/professional/account">Complete Profile</a>
    </article>
  );
};

export default CompleteProfile;
