import style from "/styles/signup.module.css";
import { ProfilePage, OtherDetails, ProfessionalDetails } from "./signupForm";
import React, { useState, useEffect, useContext } from "react";
import SendData from "../fetch/sendData";
import { FC } from "react";
import { ReplyContext } from "../providers/reply_provider";
import { LoadingContext } from "../providers/loader_provider";
import { ResponseConfig } from "../interfaces/shared";

interface Props {
  responseState: React.Dispatch<React.SetStateAction<ResponseConfig | null | undefined>>;
}

export interface userInterface {
  display_name: string;
  email: string;
  password: string;
  account_type: "personal" | "professional";
  phone_number: string;
}

export interface ProfessionalInterface {
  company_name: string;
  username: string;
  state: string;
  district: string;
}

const SignUpBox: FC<Props> = ({ responseState }) => {
  const [userCred, setUserCred] = useState<userInterface>({
    display_name: "",
    email: "",
    password: "",
    account_type: "personal",
    phone_number: "",
  });
  const titles = ["your profile", "contact details", "company details"];

  const [image, setImage] = useState<File | null>();
  const [showImage, setShowImage] = useState("");

  const [checker, setChecker] = useState(
    userCred.account_type == "personal" ? 2 : 3
  );

  const [count, setCount] = useState(0);
  const [title, setTitle] = useState(titles[count]);

  const [professionalCred, setProfessionalCred] =
    useState<ProfessionalInterface>({
      company_name: "",
      username: "",
      state: "tamil nadu",
      district: "chennai",
    });

  const { setLoading} = useContext(LoadingContext);
  const { setReply} = useContext(ReplyContext);
  const [error, setError] = useState("");

  const handleFront = () => {
    setCount((prevCount) => (prevCount + 1) % checker);
  };

  const handleBack = () => {
    setCount((prevCount) => (prevCount - 1 + checker) % checker);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setUserCred((prev) => ({ ...prev, [name]: value }));
  };

  const handleProInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let { name, value } = event.target;
    setProfessionalCred((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setShowImage(url);
      setImage(file);
    }
  };

  function findAllMissingKeys(obj: any) {
    const entry = Object.keys(obj).filter((key) => !obj[key].trim());

    if (entry.length > 0) {
      setError(`${entry.join(",")} are missing`);
      return false;
    } else {
      setError("");
      return true;
    }
  }

  const validation = () => {
    if (userCred.account_type == "personal") {
      if (findAllMissingKeys(userCred)) {
        return true;
      } else {
        return false;
      }
    } else if (userCred.account_type == "professional") {
      if (findAllMissingKeys({ ...userCred, ...professionalCred })) {
        return true;
      } else {
        return false;
      }
    } else {
      setError("Select account type");
      return false;
    }
  };

  const FormMaker = (obj: any) => {
    const formData = new FormData();

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }
    return formData;
  };

  const handleData = () => {
    if (image) {
      const FormData =
        userCred.account_type == "personal"
          ? FormMaker({ ...userCred, file: image })
          : FormMaker({ ...userCred, ...professionalCred, file: image });
      return FormData;
    } else {
      const FormData =
        userCred.account_type == "personal"
          ? FormMaker({
              ...userCred,
            })
          : FormMaker({ ...userCred, ...professionalCred });
      return FormData;
    }
  };

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validation()) {
      setLoading(true);
      const FormData = handleData();
      var res = await SendData({
        route: "/signup",
        data: FormData,
        stringify: false,
      });
      setLoading(false);
      if (res && res?.status==200) {
        responseState(res);
        setReply(res.message);
      } else if(res&& res.status!=200){
        responseState(res);
        setReply(res.message ? res?.message :"");
      }
    }
  };

  useEffect(() => {
    if (userCred.account_type == "professional") {
      setChecker(3);
    } else if (userCred.account_type == "personal") {
      setChecker(2);
    }
  }, [userCred.account_type]);

  useEffect(() => {
    setTitle(titles[count]);
  }, [count]);

  return (
    <div className={style.signup}>
      <nav>
        <h1>
          step {count + 1} of {checker}
        </h1>
        <h2>{title}</h2>
        <h4>{error}</h4>
      </nav>
      <form onSubmit={handleForm}>
        {count == 0 ? (
          <ProfilePage
            handleInput={handleInput}
            form_data={userCred}
            image={showImage}
            handleImage={handleImage}
            setError={setError}
          />
        ) : (
          ""
        )}
        {count == 1 ? (
          <OtherDetails
            setError={setError}
            handleInput={handleInput}
            form_data={userCred}
          />
        ) : (
          ""
        )}
        {count == 2 ? (
          <ProfessionalDetails
            handleInput={handleInput}
            handleProInput={handleProInput}
            form_data={professionalCred}
            setProfessionalCred={setProfessionalCred}
            setError={setError}
          />
        ) : (
          ""
        )}
        <footer>
          <button onClick={handleBack} type="button">
            Previous
          </button>
          <button onClick={handleFront} type="button">
            Next
          </button>
          <button type="submit">Submit</button>
        </footer>
      </form>
    </div>
  );
};


export default SignUpBox
