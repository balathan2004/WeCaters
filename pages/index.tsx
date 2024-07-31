import React, { Component, useState, useEffect } from "react";
import style from "/styles/index.module.css";

export default function Home() {
  return (
    <div className="container">
      <div className={style.content}>
        <div className={style.first}>
          <div className={style.fill}>
            <span className={style.namespace}>WeCaters</span>
            <p className={style.explain}>
              <span className={style.firstLine}>Welcome to WeCaters -</span>{" "}
              Connecting Events with Exceptional Catering!
            </p>
            <p className={style.text}>
              Discover a variety of catering services designed just for your
              events, from weddings to corporate functions. Find the perfect
              cooking partner for your special occasions.
            </p>
          </div>
          <div className={style.empty}></div>
        </div>
        <div className={style.second}>
          <div className={style.fill}>
            <div>
              <span className={style.firstLine}>Our Services</span>
              <span className={style.explain}>
                Discover a range of catering services tailored to suit your
                needs
              </span>
            </div>
            <div className={style.flex_box}>
              <div className={style.flex_item}>
                <span>Event Catering</span>
                <p>
                  {" "}
                  Elevate your events with our exquisite menu options and
                  impeccable service
                </p>
              </div>
              <div className={style.flex_item}>
                <span>Corporate Catering</span>
                <p>
                  Impress clients and colleagues with our professional and
                  delicious catering solutions.
                </p>
              </div>
              <div className={style.flex_item}>
                <span>Wedding Catering</span>
                <p>
                  Turn your special day into a culinary masterpiece with our
                  personalized wedding catering services.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.three}>
          <div className={style.fill}>
            <div className={style.top}>
              <div className={style.three_one}>
                <span className={style.box_title}>We organise Brands</span>
                <a className={style.context}>Catering Companies Near You: </a>
                <ul>
                  <li>
                    <span>
                      Explore a curated list of catering services in your area.
                      Refine your search based on cuisine, event type, and more
                      to find the perfect match for your event.
                    </span>
                  </li>
                  <li>
                    <span>
                      Explore catering options by searching for companies,
                      reviewing profiles, and connecting directly with your
                      chosen caterer.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={style.bottom}>
              <div className={style.three_one}>
                <span className={style.box_title}>
                  We help you to make a brand{" "}
                </span>
                <ul>
                  <li>
                    <a className={style.context}>For Catering Companies: </a>
                    <span>
                      Showcase your offerings, receive inquiries, and manage
                      bookings through our user-friendly platform.
                    </span>
                  </li>
                  <li>
                    <a className={style.context}> Expand Your Reach:</a>
                    <span>
                      Joining WeCaters allows you to reach a wider audience and
                      showcase your culinary talents to potential clients.
                    </span>
                  </li>

                  <li>
                    <a className={style.context}> Effortless Management:</a>
                    <span>
                      Easily manage inquiries, bookings, and communicate with
                      clients through our intuitive platform
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={style.four}>
          <div className={style.fill}>
            <h1>How it Works</h1>
            <div className={style.client}>
              <h2>For Catering Companies</h2>
              <ol>
                <li>
                  <span> Explore Catering Options:</span>
                  Browse diverse catering services tailored to your event needs.
                </li>
                <li>
                  <span> Refine Your Search:</span> Use filters to find options
                  matching your preferences.
                </li>
                <li>
                  <span>Review Caterer Profiles: </span>Explore menus, photos,
                  and client reviews.
                </li>
                <li>
                  <span>Connect Directly: </span>Contact caterers to discuss
                  details and finalize bookings.
                </li>
                <li>
                  <span>Book with Confidence:</span> Confirm your chosen caterer
                  and anticipate a memorable event.
                </li>
              </ol>
            </div>
            <div className={style.user}>
              <h2>For Catering Companies:</h2>
              <ol>
                <li>
                  <span>Create Your Profile:</span> Showcase your expertise with
                  photos and details.
                </li>
                <li>
                  <span>Manage Inquiries:</span> Respond promptly and
                  professionally to client queries.
                </li>
                <li>
                  <span>Showcase Your Expertise:</span> Regularly update your
                  profile with new offerings.
                </li>
                <li>
                  <span>Streamline Bookings:</span> Offer convenient online
                  booking options.
                </li>

                <li>
                  <span>Receive Feedback:</span> Encourage clients to leave
                  reviews to improve your services.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
