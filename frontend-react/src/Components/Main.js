import React from "react";

const Main = () => {
  const user = JSON.parse(localStorage.getItem("user")).user;
  console.log(user);
  return <div>Hello {user.username}</div>;
};

export default Main;
