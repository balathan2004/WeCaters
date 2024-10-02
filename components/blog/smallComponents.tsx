import moment from "moment";
import React from "react";

export const defaultImage = (name:string) => {
  var url = `https://ui-avatars.com/api/?name=${name}&size=200&background=random&color=fff&bold=true`;
  return url;
};

export const VerifiedLogo = () => {
  return (
    <>
      <span className="material-symbols-outlined">check_circle</span>
    </>
  );
};

export const getPostTime = () => {
  const time = new Date();
  const modifiedTime = moment(time).format("DD-MM-YYYY hh:mm a");
  return modifiedTime;
};

export const TimeSetter = (date:any) => {
  const formattedDate = moment(date, "DD-MM-YYYY hh:mm a").fromNow();
  //console.log(formattedDate);
  return formattedDate;
};
