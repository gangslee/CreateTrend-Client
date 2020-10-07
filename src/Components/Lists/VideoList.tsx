import React from "react";
import styled from "styled-components";
import { connect, ConnectedProps } from "react-redux";

import { RootState, RootDispatch } from "../../store/store";
import { sliderStateNext, sliderStatePrev } from "../../store/reducers/slider";
import Slider from "../Container/Slider";

interface IVideoListStyleProps {
  mode?: string;
}

const VideoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
`;

const Image = styled.img`
  width: ${({ mode }: IVideoListStyleProps) =>
    mode === "analysis" ? "45%" : "55%"};
  height: ${({ mode }: IVideoListStyleProps) =>
    mode === "analysis" ? "180px" : "110px"};
  margin-right: ${({ mode }: IVideoListStyleProps) =>
    mode === "analysis" ? "20px" : "15px"};
  border-radius: 10px;

  &:hover {
    opacity: 0.7;
  }
  transition: opacity 0.3s linear, background-image 0.3s linear;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  width: 65%;
`;

const Info = styled.div`
  font-size: 16px;
  font-weight: 600;

  :nth-child(2) {
    margin-bottom: 20px;
  }
  :nth-child(even) {
    font-family: "S-CoreDream-4Regular";
  }
  :nth-child(odd) {
    color: #d10909;
    font-size: 20px;
    margin-bottom: 10px;
  }
  :last-child {
    color: #5577ff;
  }
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const VideoTitle = styled.div`
  width: 44%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  font-family: "S-CoreDream-4Regular";
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

const Error = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

interface OwnProps {
  type: string;
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  if (ownProps.type === "keyword") {
    return {
      states: { data: state.keyword.video, current: state.slider.keyword },
    };
  } else if (ownProps.type === "statistics") {
    return {
      states: {
        data:
          state.statistics.keywordChart[state.statistics.currentChart].keyword[
            state.statistics.currentKeyword
          ].video,
        current: state.slider.statistics,
      },
    };
  } else if (ownProps.type === "star") {
    return {
      states: {
        data: state.star.video.concat(state.period.video),
        current: state.slider.star,
      },
    };
  }
}

interface ISliderState {
  page: string;
  len: number;
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: (data: ISliderState, type: boolean) => {
      dispatch(type ? sliderStateNext(data) : sliderStatePrev(data));
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IVideoListProps extends Props {
  mode: string;
  type: string;
  title?: string;
}

function VideoList({ states, update, mode, type }: IVideoListProps) {
  const handleOnClick = (e: React.MouseEvent) => {
    const direction = e.currentTarget.id === "next" ? true : false;
    update({ page: type, len: usingData.data.length - 1 }, direction);
  };

  const usingData = states.data.filter((data) => data.type === mode)[0];

  const current = states.current;

  return usingData.data.length === 0 ? (
    <ErrorContainer>
      <Error>분석결과가 없습니다!</Error>
    </ErrorContainer>
  ) : (
    <>
      {mode === "analysis" ? (
        <Slider onClick={handleOnClick}>
          <VideoContainer>
            <Image src={usingData.data[current].thumbnail_url} mode={mode} />
            <InfoContainer>
              <Info>영상 제목</Info>
              <Info>{usingData.data[current].video_name}</Info>
              <Info>관련 키워드</Info>
              <Info>
                {usingData.data[current].videokeywordnew
                  .slice(0, 5)
                  .map((word, index) => `#${word.keyword}   `)}
              </Info>
            </InfoContainer>
          </VideoContainer>
        </Slider>
      ) : (
        <>
          {usingData.data.slice(0, 5).map((data, index) => (
            <VideoContainer key={index}>
              <Image src={usingData.data[index].thumbnail_url} mode={mode} />

              <VideoTitle>{data.video_name}</VideoTitle>
            </VideoContainer>
          ))}
        </>
      )}
    </>
  );
}

export default connector(VideoList);
