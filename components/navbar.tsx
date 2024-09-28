import Head from "next/head";
import { NavbarInterface } from "./interfaces/front";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useSelector, UseSelector } from "react-redux";
import Link from "next/link";

import React, { useContext, useState, useEffect } from "react";


export default function Navbar() {
  const currentRoute = useRouter().asPath;
  console.log(currentRoute)
  const dirs = useSelector(
    (state: any) => state.NAVCRED.value as NavbarInterface[]
  );
  const [inputValue, setInputValue] = useState<boolean>(false);

  const changeInput = () => {
    setInputValue(false);
  };

  const setInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.checked);
  };


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
        <Link href="/" className={"brand"}>
          WeCaters
        </Link>
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
