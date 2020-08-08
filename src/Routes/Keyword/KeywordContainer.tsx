import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, keywordDataUpdate, IKeywordData} from '../../store';
import KeywordPresenter from './KeywordPresenter';

const getData = (): IKeywordData => {
  const data = {
    wordmap: [
      {
        name: '리그오브레전드',
        children: [
          {
            name: '롤',
            value: 200,
          },
          {
            name: '넥서스',
            value: 180,
          },
          {
            name: '라이엇',
            value: 160,
          },
          {
            name: '볼리베어',
            value: 140,
          },
          {
            name: '페이커',
            value: 120,
          },
          {
            name: 'LCK',
            value: 100,
          },
          {
            name: '담원',
            value: 80,
          },
        ],
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
        name: '인기 키워드',
        data: [
          '롤',
          '볼리베어',
          '패치노트',
          '누누',
          '페이커',
          '기인',
          '담원',
          '모데카이저',
          '쇼메이커',
          'DRX',
        ],
      },
      {
        name: '영상화 키워드',
        data: [
          'LCK',
          '패치노트',
          '헬퍼',
          '김민교',
          '정글',
          '감스트',
          '롤토체스',
          '쵸비',
          '가렌',
          '매드무비',
        ],
      },
    ],
    video: [
      {
        type: 'analysis',
        data: [
          {
            id: 'Y34wmDantyM',
            name: '[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
            thumbnail:
              'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
            keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
          },
          {
            id: 'kpHFdVjLQbA',
            name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
            thumbnail:
              'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
            keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
          },
          {
            id: 'my4j1Z5c88A',
            name: '신챔프 수학 출시 임박, 요네 심화 정보',
            thumbnail:
              'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
            keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
          },
          {
            id: 'K4mI_q1I5lU',
            name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
            thumbnail:
              'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
            keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
          },
          {
            id: 'zKTXxy9Z6hs',
            name: "다시 돌아온 100만 조회수의 '그 버그'",
            thumbnail:
              'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
            keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
          },
        ],
        current: 0,
      },
      {
        type: 'aside',
        data: [
          {
            id: 'r1RJA020Ozo',
            name: '[롤] 감스트 실버승급전!! 브론즈분들 먼저올라갑니다^^ LOL',
            thumbnail:
              'https://i.ytimg.com/vi/r1RJA020Ozo/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBbgMa8F_b2PS0OR-GSYJIeL0_efg',
          },
          {
            id: 'd15O3zSLA_Q',
            name: 'Yone Champion Spotlight | Gameplay - League of Legends',
            thumbnail:
              'https://i.ytimg.com/vi/d15O3zSLA_Q/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDZcoYeCuS-Mu4-_PvLogx8BpbGmA',
          },
          {
            id: 'my4j1Z5c88A',
            name: '각성한 피지컬! 페이커 7-8월 롤 매드무비 [T1 Faker Montage]',
            thumbnail:
              'https://i.ytimg.com/vi/SEPY5wPtH6g/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCxPoUb0rDaaxz1LhMQ1Da3XEbISA',
          },
          {
            id: 'gESNgH-xL-0',
            name:
              '금요일 요네 출시..방학 시작..랭겜..파.괴.｜10.16 LOL 패치노트 하이라이트 - 리그 오브 레전드',
            thumbnail:
              'https://i.ytimg.com/vi/gESNgH-xL-0/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCEH2VHC8vflOYy7DxRak5eDrMhRg',
          },
          {
            id: 'xyoMSOmKY9U',
            name: '요네랑 릴리아 두둥등장! | 롤 애니메이션',
            thumbnail:
              'https://i.ytimg.com/vi/xyoMSOmKY9U/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB2yu9Jb0VZwuXdyJKaJexNGkdayw',
          },
        ],
        current: 0,
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
