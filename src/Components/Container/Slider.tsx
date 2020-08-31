import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

interface IArrowProps {
  bgUrl: string;
  onClick: (e: React.MouseEvent, direction?: boolean) => void;
}

const Arrow = styled.div`
  width: 24px;
  height: 24px;
  display: inline-block;
  background-image: url(${({ bgUrl }: IArrowProps) => bgUrl});
  background-size: cover;
  background-position: center center;
  &:hover {
    opacity: 0.5;
  }
  transition: opacity 0.1s linear;
`;

interface ISliderProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
}

export default function Slider({ children, onClick }: ISliderProps) {
  return (
    <Container>
      <Arrow
        bgUrl={require("../../Asset/images/back.png")}
        onClick={onClick}
        id="prev"
      />
      {children}
      <Arrow
        bgUrl={require("../../Asset/images/next.png")}
        onClick={onClick}
        id="next"
      />
    </Container>
  );
}
