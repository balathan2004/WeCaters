import React, { FC, useState, useRef, useEffect } from "react";
import style from "/styles/account.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import { userInterface } from "../interfaces/shared";
interface Props {
  label_name: string;
  initialValue: string;
  changeState: React.Dispatch<React.SetStateAction<userInterface>>;
  editable?: boolean;
  variable_name?: string;
  placeholder?: string;
}

const AccountInput: FC<Props> = ({
  label_name,
  initialValue,
  changeState,
  editable = true,
  variable_name = "",
  placeholder = "",
}) => {
  const [edit, setEdit] = useState(true);
  const currentInput = useRef<HTMLInputElement>(null);
  const setState = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;

    changeState((prev) => ({ ...prev, [name]: value }));
  };
  const changeEdit = () => {
    if (editable) {
      setEdit(!edit);
    }
  };

  useEffect(() => {
    if (!edit && currentInput.current) {
      currentInput.current.focus();
    }
  }, [edit]);

  return (
    <div className={style.data}>
      <div className={style.label_container}>
        <label>{label_name}</label>
        {editable ? (
          <>
            {edit ? (
              <FontAwesomeIcon
                icon={faPenToSquare}
                onClick={changeEdit}
                className={style.icon}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCheck}
                onClick={changeEdit}
                className={style.icon}
              />
            )}
          </>
        ) : null}
      </div>

      <input
        disabled={edit}
        value={initialValue ? initialValue : ""}
        onChange={setState}
        placeholder={placeholder}
        name={variable_name}
        ref={currentInput}
      />
    </div>
  );
};

export default AccountInput;
