import React, { FC, useState } from "react";
import styles from "../../styles/signupform.module.css";
import {
  ResponseConfig,
  userAuthResponse,
} from "@/components/interfaces/shared";
import { provider, auth } from "@/components/firebase_config";
import SendData from "@/components/fetch/sendData";
import { signInWithPopup } from "firebase/auth";
import { defaultImage } from "@/components/blog/smallComponents";
import { useRouter } from "next/router";

interface FormProps {
  display_name: string;
  email: string;
  account_type: "personal" | "professional";
  uid: string;
  profile_url: string;
}

const GoogleLogin: FC = () => {
  const router=useRouter()
  const [formData, setFormData] = useState<FormProps>({
    display_name: "",
    email: "",
    account_type: "personal",
    uid: "",
    profile_url: "",
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(formData.email!=""){
      const response = await SendData({
        route: "/api/auth/google_login",
        data: formData,
      }) as ResponseConfig
    
      if(response&&response.status==200){
        router.push("/blog")
      }
    }else{
      alert("click the link button to add email")
    }

   
  };

  const popup = async () => {
    const userdata: Omit<FormProps, "account_type"> = await new Promise(
      (resolve, reject) => {
        signInWithPopup(auth, provider).then(({ user }) => {
          resolve({
            email: user.email ? user.email : "",
            display_name: user.displayName ? user.displayName : "",
            profile_url: user.photoURL
              ? user.photoURL
              : defaultImage(user.displayName ? user.displayName : ""),
            uid: user.uid,
          });
        });
      }
    );
    setFormData((prev) => ({ account_type: prev.account_type, ...userdata }));
    console.log(userdata);
  };

  return (
    <div className="container">
      <div className={styles.signup_container}>
        <div className={styles.signup}>
          <section className={styles.profile}>
            <header>
              <h1>Create Your Account</h1>
            </header>
            <button onClick={popup}>Link Google Account</button>
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
                  placeholder="Link account to see email"
                  required
                  name="email"
                  onChange={handleInput}
                  type="email"
                  readOnly={true}
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
                  <label htmlFor="professional_account_type">
                    Professional
                  </label>
                </div>
              </article>
              <footer>
                <button type="submit">Create Account</button>
              </footer>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GoogleLogin;
