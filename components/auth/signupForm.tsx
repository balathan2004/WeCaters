import cityData from "@/components/src/new.json";
import SendData from "../fetch/sendData";
import styles from "/styles/signup.module.css";
import { userInterface, ProfessionalInterface } from "./signup";
import { FC } from "react";

import React, { useEffect, useState, useRef } from "react";

interface Props {
  handleInput: React.ChangeEventHandler<HTMLInputElement>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  form_data: userInterface;
  image: string;
  handleImage: React.ChangeEventHandler<HTMLInputElement>;
}

type OtherDetailsProps = Omit<Props, "image" | "handleImage">;

type ProfessionalProps = {
  form_data: ProfessionalInterface;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleInput: React.ChangeEventHandler<HTMLInputElement>;
  setProfessionalCred: React.Dispatch<
    React.SetStateAction<ProfessionalInterface>
  >;
  handleProInput: React.ChangeEventHandler<HTMLSelectElement>;
};

type stateInterface = {
  [key: string]: string[];
};

interface districtsProps {
  districts: string[];
}

const City_Data: stateInterface = cityData;

const ProfilePage: FC<Props> = ({
  handleInput,
  setError,
  form_data,
  image,
  handleImage,
}) => {
  return (
    <section className={styles.profile}>
      <header>
        <h1>Add Profile Photo</h1>
        <img src={image ? image : "/user_placeholder.png"}></img>
        <input type="file" id="file" onChange={handleImage} />
        <label htmlFor="file"> Browse Image</label>
      </header>
      <main>
        <label>Your Name</label>
        <input
          value={form_data.display_name}
          placeholder="Enter your Name"
          name="display_name"
          required
          type="text"
          onChange={handleInput}
        ></input>
        <label>Your Email</label>
        <input
          value={form_data.email}
          placeholder="Enter your Email"
          required
          name="email"
          onChange={handleInput}
          type="email"
        ></input>
      </main>
    </section>
  );
};

const OtherDetails: FC<OtherDetailsProps> = ({
  handleInput,
  form_data,
  setError,
}) => {
  return (
    <section className={styles.other}>
      <label>Your Password</label>
      <input
        value={form_data.password}
        onChange={handleInput}
        required
        type="text"
        name="password"
        minLength={8}
        placeholder="Enter your Password"
      ></input>
      <label>Your Phone Number</label>
      <input
        onChange={handleInput}
        required
        type="text"
        name="phone_number"
        placeholder="Enter your Phone"
        value={form_data.phone_number}
      ></input>
      <label>Select Account type</label>
      <div className={styles.radio_container}>
        <input
          onChange={handleInput}
          type="radio"
          id="personal_account_type"
          required
          name="account_type"
          value="personal"
          checked={form_data.account_type === "personal"}
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
          checked={form_data.account_type == "professional"}
        />
        <label htmlFor="professional_account_type">Professional</label>
      </div>
    </section>
  );
};

const ProfessionalDetails: FC<ProfessionalProps> = ({
  handleInput,
  handleProInput,
  form_data,
  setProfessionalCred,
  setError,
}) => {
  const cities = cityData;
  const states = Object.keys(cities);
  console.log(cities);
  const [districts, setDistricts] = useState<string[]>([]);
  const usernameRef = useRef<HTMLInputElement | null>(null);

  const EvaluateUsername = (name: string) => {
    var regex = /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/;
    return regex.test(name);
  };

  const District: FC<districtsProps> = ({ districts }) => {
    return (
      <article>
        <label>Select your District</label>
        <select
          onChange={handleProInput}
          value={form_data.district}
          name="district"
        >
          {districts.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </article>
    );
  };

  useEffect(() => {
    setDistricts(City_Data[form_data.state]);
  }, [form_data.state]);

  async function checkForUsername() {
    const username = usernameRef.current?.value;
    if (username && EvaluateUsername(username)) {
      const response = await SendData({
        route: "username_check",
        data: {
          username: username,
        },
      });
      console.log(response);
      if (response&& response.status === 200) {
        setError(response.message);
        setProfessionalCred((prev) => ({ ...prev, username: username }));
      } else {
        setError(response?response.message:"");
      }
    }
  }

  return (
    <section className={styles.pro}>
      <label>Create username</label>
      <div className={styles.extra_container}>
        <input
          name="username"
          ref={usernameRef}
          placeholder="Your username"
          type="text"
          required
        ></input>
        <button type="button" onClick={checkForUsername}>
          check
        </button>
      </div>

      <label>Enter Your Company Name</label>
      <input
        onChange={handleInput}
        name="company_name"
        placeholder="Your company name"
        type="text"
        required
      ></input>
      <label> Your State</label>
      <select onChange={handleProInput} value={form_data.state} name="state">
        {states.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
      <District districts={districts} />
    </section>
  );
};

export { ProfilePage, ProfessionalDetails, OtherDetails };
