import React from "react";
import styled, { css } from "styled-components";
import { connect, ConnectedProps } from "react-redux";

import {
  RootState,
  RootDispatch,
  sliderStateNext,
  sliderStatePrev,
} from "../../store";
import Slider from "../Container/Slider";

const Container = styled.div`
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 40px;
  padding: 20px 10px;
`;

interface ISCProps {
  type: string;
  bgUrl?: string;
}

const TitleContainer = styled.div<ISCProps>`
  ${(props) =>
    props.type === "aside" &&
    css`
      text-align: center;
    `};
  padding: 0px 10px;
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  :first-child {
    color: #feb100;
    margin-right: 5px;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Image = styled.img`
  width: ${({ type }: ISCProps) => (type === "analysis" ? "35%" : "60%")};
  height: ${({ type }: ISCProps) => (type === "analysis" ? "120px" : "85px")};
  margin-right: ${({ type }: ISCProps) =>
    type === "analysis" ? "20px" : "5px"};
  border-radius: 5px;
  background-image: url(${({ bgUrl }: ISCProps) => bgUrl});
  background-size: cover;
  background-position: center center;
  &:hover {
    opacity: 0.7;
  }
  transition: opacity 0.3s linear, background-image 0.3s linear;
`;

const InfoContainer = styled.div`
  width: 65%;
`;

const Info = styled.div`
  font-size: 14px;
  font-weight: 600;
  :nth-child(2) {
    margin-bottom: 10px;
  }
  :nth-child(odd) {
    color: #feb100;
    font-size: 16px;
  }
  :last-child {
    color: #5577ff;
  }
`;

const VideoTitle = styled.div`
  width: 40%;
  padding: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  font-size: 14px;
  font-weight: 600;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

function mapStateToProps(state: RootState) {
  return { data: state.keyword.video };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: (data: number, type: boolean) => {
      dispatch(type ? sliderStateNext(data) : sliderStatePrev(data));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IVideoListProps extends Props {
  type: string;
}

function VideoList({ data, update, type }: IVideoListProps) {
  function handleOnClick(e: React.MouseEvent) {
    const usingDataIdx = data.indexOf(
      data.filter((data) => data.type === type)[0]
    );
    e.currentTarget.id === "next"
      ? update(usingDataIdx, true)
      : update(usingDataIdx, false);
  }

  const usingData = data.filter((data) => data.type === type)[0];
  // console.log(usingData);
  return (
    <Container>
      <TitleContainer type={type}>
        <Title>리그오브레전드</Title>
        <Title>인기 영상</Title>
      </TitleContainer>
      {type === "analysis" ? (
        <Slider onClick={handleOnClick}>
          <VideoContainer>
            <Image
              bgUrl={usingData.data[usingData.current].thumbnail}
              type={type}
            />
            <InfoContainer>
              <Info>영상 제목</Info>
              <Info>{usingData.data[usingData.current].name}</Info>
              <Info>관련 키워드</Info>
              <Info>
                {usingData.data[usingData.current].keyword.map((word, index) =>
                  index !== usingData.data[usingData.current].keyword.length - 1
                    ? `#${word}, `
                    : `#${word}`
                )}
              </Info>
            </InfoContainer>
          </VideoContainer>
        </Slider>
      ) : (
        <>
          {usingData.data.map((data, index) => (
            <VideoContainer key={data.id}>
              <Image bgUrl={usingData.data[index].thumbnail} type={type} />
              <VideoTitle>{data.name}</VideoTitle>
            </VideoContainer>
          ))}
        </>
      )}
    </Container>
  );
}

export default connector(VideoList);
