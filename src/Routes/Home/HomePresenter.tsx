import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Temp = styled.div`
  font-family: "S-CoreDream-5Medium";
`;

function HomePresenter() {
  return (
    <div>
      {/* <h1>HomePresenter</h1> */}
      <Temp>리그오브레전드</Temp>
      {/* <ol>
        <li>
          <Link to={"/keyword/롤챔스"}>Keyword</Link>
        </li>
        <li>
          <Link to={"/statistics"}>Statistics</Link>
        </li>
        <li>
          <Link to={"/star/5"}>Star</Link>
        </li>
      </ol> */}
    </div>
  );
}

export default HomePresenter;
