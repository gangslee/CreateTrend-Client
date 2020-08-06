import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootDispatch, keywordDataUpdate, IKeywordData } from "../../store";
import KeywordPresenter from "./KeywordPresenter";

const getData = (): IKeywordData => {
  const data = {
    wordmap: [
      {
        name: "볼리베어",
        children: [
          {
            name: "롤",
            value: 200,
          },
          {
            name: "넥서스",
            value: 80,
          },
        ],
      },
    ],

    comment: [
      {
        avatar: "a1",
        comment: "c1",
        thumbnail: "https://i.ytimg.com/vi/OIjqprSfYD4/hq720.jpg",
      },
      {
        avatar: "a1",
        comment: "c1",
        thumbnail: "https://i.ytimg.com/vi/OIjqprSfYD4/hq720.jpg",
      },
      {
        avatar: "a1",
        comment: "c1",
        thumbnail: "https://i.ytimg.com/vi/OIjqprSfYD4/hq720.jpg",
      },
    ],
    lines: [
      {
        name: "keyword-linechart1",
        data: [
          { date: "2020-08-01", value: 4500 },
          { date: "2020-08-02", value: 2690 },
          { date: "2020-08-03", value: 7000 },
          { date: "2020-08-04", value: 4900 },
          { date: "2020-08-05", value: 5000 },
          { date: "2020-08-06", value: 4500 },
          { date: "2020-08-07", value: 2690 },
          { date: "2020-08-08", value: 7000 },
          { date: "2020-08-09", value: 4900 },
        ],
      },
      {
        name: "keyword-linechart2",
        data: [
          { date: "2020-08-01", value: 4900 },
          { date: "2020-08-02", value: 7000 },
          { date: "2020-08-03", value: 2690 },
          { date: "2020-08-04", value: 4500 },
          { date: "2020-08-05", value: 5000 },
          { date: "2020-08-06", value: 4900 },
          { date: "2020-08-07", value: 7000 },
          { date: "2020-08-08", value: 2690 },
          { date: "2020-08-09", value: 4500 },
        ],
      },
    ],
    keyword: [
      {
        name: "n1",
        data: ["aa", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
      },
      {
        name: "n2",
        data: ["k", "l", "m", "n", "o", "p", "q", "r", "s", "a"],
      },
      {
        name: "n3",
        data: ["b", "c", "d", "e", "f", "g", "h", "i", "j", "k"],
      },
    ],
    video: [
      {
        name: "n1",
        data: [
          {
            name: "video1",
            thumbnail: "https://i.ytimg.com/vi/yGKskqjPH1o/hq720.jpg",
            link: "https://www.youtube.com/watch?v=yGKskqjPH1o",
          },
        ],
      },
      {
        name: "n2",
        data: [
          {
            name: "video2",
            thumbnail: "https://i.ytimg.com/vi/yGKskqjPH1o/hq720.jpg",
            link: "https://www.youtube.com/watch?v=yGKskqjPH1o",
          },
        ],
      },
    ],
  };
  return data;
};

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: (data: IKeywordData) => {
      if (data) {
        dispatch(keywordDataUpdate(data));
      }
    },
  };
}

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function KeywordContainer({ update }: Props) {
  useEffect(() => {
    const sampleData = getData();
    update(sampleData);
  }, [update]);
  return <KeywordPresenter />;
}

export default connector(KeywordContainer);
