import Head from "next/head";
import { NavbarInterface } from "./interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { NavBarProvider } from "@/pages/_app";
import React, { useContext, useState, useEffect } from "react";

interface NewNavConfig{
  dirs:NavbarInterface[],
  setDirs:React.Dispatch<React.SetStateAction<NavbarInterface[]>>
}

export default function Navbar() {
  const currentRoute = useRouter().asPath.replace("/", "");
  const {dirs, setDirs} = useContext<NewNavConfig>(NavBarProvider);
  const [inputValue, setInputValue] = useState<boolean>(false);

  const changeInput = () => {
    setInputValue(false);
  };

  const setInput = (event: React.ChangeEvent<HTMLInputElement>) => {

    setInputValue(event.target.checked)
  
  };

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  return (
    <div>
      <nav className={"nav"}>
        <input
          className={"input"}
          type="checkbox"
          id="check"
          onChange={setInput}
          checked={inputValue}
        ></input>
        <label htmlFor="check" className={"checkbtn"}>
          <FontAwesomeIcon icon={faBars} />
        </label>
        <a href="/" className={"brand"}>
          WeCaters
        </a>
        <ul className={"uls"}>
          {dirs.map((x) => {
            if (x.route != currentRoute) {
              return (
                <li key={x.route} id={x.route}>
                  <Link href={x.route} onClick={changeInput}>
                    {x.name}
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={x.route} id={x.route}>
                  <Link href={x.route} className={"active"}>
                    {x.name}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </div>
  );
}
