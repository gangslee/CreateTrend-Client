import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, keywordDataUpdate, IKeywordData} from '../../store';
import KeywordPresenter from './KeywordPresenter';

const getData = (): IKeywordData => {
  const data = {
    wordmap: [
      {
        name: '볼리베어',
        children: [
          {
            name: '롤',
            value: 200,
          },
          {
            name: '넥서스',
            value: 80,
          },
        ],
      },
    ],

    comment: [
      {
        avatar:
          'https://yt3.ggpht.com/a/AATXAJxUpf1rMI6WCz3S3h5i2Dzhb5DgMWD1ntDl5ubd=s48-c-k-c0xffffffff-no-rj-mo',
        comment:
          '안녕하세요!!  쓰리컨드입니다 ~,~이렇게 두번씩이나 형님께  방송을 배우니 덕분에 저도 예능감이 조금은 늘은것 같습니다!?? 너무 감사합니다ㅋㅋㅋ ',
        thumbnail:
          'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBdpLf5j87DDuew84T0hLDO_KSnCQ',
        link: 'https://www.youtube.com/watch?v=Y34wmDantyM',
      },
      {
        avatar:
          'https://yt3.ggpht.com/a/AATXAJxDlLzF1fsvIjyemmh-avKWPKemoUX0zDAcaI-h=s48-c-k-c0xffffffff-no-rj-mo',
        comment:
          '무슨 리그오브레전드 나레이션 성우님이 동화책 읽어주는 느낌이네 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
        thumbnail: 'https://i.ytimg.com/vi/LNpvFYq853s/hqdefault.jpg',
        link: 'https://www.youtube.com/watch?v=LNpvFYq853s',
      },
      {
        avatar:
          'https://yt3.ggpht.com/a/AATXAJyEtDdPxpA1zBw8E3FLWc9FoD-iZSvSlb6F1qhoTQ=s48-c-k-c0xffffffff-no-rj-mo',
        comment:
          'Way to feature a streamer clip doing bugs about Yone and emotes instead of Vandril who first found the bugs',
        thumbnail: 'https://i.ytimg.com/vi/G0TyjkteZJw/hqdefault.jpg',
        link: 'https://www.youtube.com/watch?v=G0TyjkteZJw',
      },
    ],
    lines: [
      {
        name: '인기도 추이',
        data: [
          {date: '2020-08-01', value: 4500},
          {date: '2020-08-02', value: 2690},
          {date: '2020-08-03', value: 7000},
          {date: '2020-08-04', value: 4900},
          {date: '2020-08-05', value: 5000},
          {date: '2020-08-06', value: 4500},
          {date: '2020-08-07', value: 2690},
          {date: '2020-08-08', value: 7000},
          {date: '2020-08-09', value: 4900},
        ],
      },
      {
        name: '영상화 추이',
        data: [
          {date: '2020-08-01', value: 4900},
          {date: '2020-08-02', value: 7000},
          {date: '2020-08-03', value: 2690},
          {date: '2020-08-04', value: 4500},
          {date: '2020-08-05', value: 5000},
          {date: '2020-08-06', value: 4900},
          {date: '2020-08-07', value: 7000},
          {date: '2020-08-08', value: 2690},
          {date: '2020-08-09', value: 4500},
        ],
      },
    ],
    keyword: [
      {
        name: 'n1',
        data: ['aa', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
      },
      {
        name: 'n2',
        data: ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'a'],
      },
      {
        name: 'n3',
        data: ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
      },
    ],
    video: [
      {
        name: 'n1',
        data: [
          {
            name: 'video1',
            thumbnail: 'https://i.ytimg.com/vi/yGKskqjPH1o/hq720.jpg',
            link: 'https://www.youtube.com/watch?v=yGKskqjPH1o',
          },
        ],
      },
      {
        name: 'n2',
        data: [
          {
            name: 'video2',
            thumbnail: 'https://i.ytimg.com/vi/yGKskqjPH1o/hq720.jpg',
            link: 'https://www.youtube.com/watch?v=yGKskqjPH1o',
          },
        ],
      },
    ],
  };
  return data;
};

function mapStateToProps(state: RootState) {
  return {useAble: state.keyword.useAble};
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: (data: IKeywordData) => {
      if (data) {
        dispatch(keywordDataUpdate(data));
      }
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function KeywordContainer({useAble, update}: Props) {
  useEffect(() => {
    const sampleData = getData();
    update(sampleData);
  }, [update]);
  return <KeywordPresenter loading={useAble} />;
}

export default connector(KeywordContainer);
