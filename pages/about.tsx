import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faWhatsapp,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import style from "/styles/about.module.css";
export default function About() {
  var one = ["bala_senju", "bala_senju"];
  var two = ["__e_n_t_r_e_p_r_e_n_e_u_r", "__e_n_t_r_e_p_r_e_n_e_u_r"];

  return (
    <div className="container">
      <div className={style.about}>
        <header>
          <h1>Welcome To Caters</h1>
          <h1>About us </h1>
        </header>

        <main className={style.main}>
          <article>
            <h2>Dev</h2>
            <img src={"/profile.jpg"}></img>
            <h4>Light Yagami</h4>
            <p>Developer of this site </p>
            <span>Managing interactions</span>
            <div className={style.social}>
              <a href={`https://instagram.com/${one[0]}`} target="_blank">
                <FontAwesomeIcon className={style.icon} icon={faInstagram} />
              </a>

              <a href={`https://instagram.com/${one[1]}`} target="_blank">
                {" "}
                <FontAwesomeIcon className={style.icon} icon={faFacebook} />
              </a>
            </div>
          </article>
          <article>
            <h2>Marketting</h2>
            <img src={"/profile2.jpg"}></img>
            <h4>Pradeep Kumar</h4>
            <p>Marketting for this site</p>
            <span>Managing Customers</span>

            <div className={style.social}>
              <a href={`https://instagram.com/${two[0]}`} target="_blank">
                <FontAwesomeIcon className={style.icon} icon={faWhatsapp} />
              </a>
              <a href={`https://instagram.com/${two[1]}`} target="_blank">
                <FontAwesomeIcon className={style.icon} icon={faFacebook} />
              </a>
              <a href={`https://instagram.com/${two[0]}`} target="_blank">
                <FontAwesomeIcon className={style.icon} icon={faInstagram} />
              </a>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
