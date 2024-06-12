import React from "react";
import LabSet from "../components/LabSet";

interface Props {
  loggedIn: boolean;
}

const Home = ({ loggedIn }: Props) => {
  return <LabSet loggedIn={loggedIn}></LabSet>;
};

export default Home;
