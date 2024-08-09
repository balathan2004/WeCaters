import React, { FC, useState } from "react";
import { ResponseConfig, userAuthResponse } from "../interfaces/shared";
import styles from "/styles/signupform.module.css";
import SendData from "../fetch/sendData";

interface Props {
  responseState: React.Dispatch<
    React.SetStateAction<userAuthResponse | null | undefined>
  >;
}

interface FormProps {
  display_name: string;
  email: string;
  password: string;
  account_type: "personal" | "professional";
}

const SingleForm: FC<Props> = ({ responseState }) => {
  const [formData, setFormData] = useState<FormProps>({
    display_name: "",
    email: "",
    password: "",
    account_type: "personal",
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = (await SendData({
      route: "/api/auth/signup",
      data: formData,
    })) as ResponseConfig;

    responseState(response);
  };

  return (
    <div className={styles.signup}>
      <section className={styles.profile}>
        <header>
          <h1>Create Your Account</h1>
        </header>
        <form onSubmit={submitForm}>
          <article>
            <label>Your Name</label>
            <input
              value={formData.display_name}
              placeholder="Enter your Name"
              name="display_name"
              required
              type="text"
              onChange={handleInput}
            ></input>
          </article>
          <article>
            <label>Your Email</label>
            <input
              value={formData.email}
              placeholder="Enter your Email"
              required
              name="email"
              onChange={handleInput}
              type="email"
            ></input>
          </article>

          <article>
            <label>Your Password</label>
            <input
              value={formData.password}
              onChange={handleInput}
              required
              type="text"
              name="password"
              minLength={6}
              placeholder="Enter your Password"
            ></input>
          </article>
          <article>
            <label>Select Account type</label>
            <div className={styles.radio_container}>
              <input
                onChange={handleInput}
                type="radio"
                id="personal_account_type"
                required
                name="account_type"
                value="personal"
                checked={formData.account_type === "personal"}
              />

              <label htmlFor="personal_account_type">Personal</label>
            </div>

            <div className={styles.radio_container}>
              <input
                onChange={handleInput}
                type="radio"
                required
                id="professional_account_type"
                name="account_type"
                value="professional"
                checked={formData.account_type == "professional"}
              />
              <label htmlFor="professional_account_type">Professional</label>
            </div>
          </article>
          <footer>
            <button type="submit">Create Account</button>
          </footer>
        </form>
      </section>
    </div>
  );
};

export default SingleForm;
