import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {
  RootState,
  RootDispatch,
  starDataUpdate,
  periodDataUpdate,
  starPieSliceStateUpdate,
  currentPage,
  IStarState,
} from '../../store';
import StarPresenter from './StarPresenter';

function getData(): IStarState {
  const data: IStarState = {
    channelInfo: {
      thumbnail_url:
        'https://yt3.ggpht.com/a/AATXAJw3EcB9ytfVAtJbfcUr5I5-07RFbmQrXDhUe21aaQ=s88-c-k-c0xffffffff-no-rj-mo',
      channel_description:
        'G리는 영화&드라마 리뷰&프리뷰채널, 지무비 : G Movie \n\n[지무비 공식 인스타그램] \nhttps://www.instagram.com/G_movie__/\n[지무비 개인 인스타그램] \nhttps://www.instagram.com/awayout1/\n[지무비 페이스북] \nhttps://www.facebook.com/pg/Gmoviee\n[팬 사서함]\n서울특별시 강남구 테헤란로 518 15층 샌드박스 네트워크 \n받는 사람명 - 지무비\n[문의 이메일] \nawayout2@naver.com',
      channel_name: '지무비 : G Movie',
      channel_start_date: '2017-11-26',
      subscriber: 3610000,
    },
    video: [
      {
        type: 'aside',
        data: [
          {
            id: '257R-JkTmcA',
            name: '시속 1,665km이상 달릴 수 없다면 죽어야하는 상상초월의 대재앙..',
            thumbnail: 'https://i.ytimg.com/vi/257R-JkTmcA/hqdefault.jpg',
          },
          {
            id: '9VzZ1G8X_I0',
            name: '상위 0.1% 재벌2세 참교육하는 상위 0.001% 재벌 형사(?)',
            thumbnail: 'https://i.ytimg.com/vi/9VzZ1G8X_I0/hqdefault.jpg',
          },
          {
            id: 'zS82ef7mQzw',
            name: '분장을 벗은 영화 캐릭터들의 G리는 실제 모습들..',
            thumbnail: 'https://i.ytimg.com/vi/zS82ef7mQzw/hqdefault.jpg',
          },
        ],
      },
    ],
    keyword: {
      pie: [
        {
          name: '지무비',
          value: 17,
          wordmap: [
            {
              name: '지무비',
              children: [
                {
                  name: '1번 노드',
                  value: 10,
                },
                {
                  name: '2번 노드',
                  value: 9,
                },
                {
                  name: '3번 노드',
                  value: 8,
                },
                {
                  name: '4번 노드',
                  value: 7,
                },
                {
                  name: '5번 노드',
                  value: 6,
                },
                {
                  name: '6번 노드',
                  value: 5,
                },
                {
                  name: '7번 노드',
                  value: 4,
                },
              ],
            },
          ],
        },
        {
          name: '채널',
          value: 16,
          wordmap: [
            {
              name: '채널',
              children: [
                {
                  name: '1번 노드',
                  value: 10,
                },
                {
                  name: '2번 노드',
                  value: 9,
                },
                {
                  name: '3번 노드',
                  value: 8,
                },
                {
                  name: '4번 노드',
                  value: 7,
                },
                {
                  name: '5번 노드',
                  value: 6,
                },
                {
                  name: '6번 노드',
                  value: 5,
                },
                {
                  name: '7번 노드',
                  value: 4,
                },
              ],
            },
          ],
        },
        {
          name: '가입',
          value: 14,
          wordmap: [
            {
              name: '가입',
              children: [
                {
                  name: '1번 노드',
                  value: 10,
                },
                {
                  name: '2번 노드',
                  value: 9,
                },
                {
                  name: '3번 노드',
                  value: 8,
                },
                {
                  name: '4번 노드',
                  value: 7,
                },
                {
                  name: '5번 노드',
                  value: 6,
                },
                {
                  name: '6번 노드',
                  value: 5,
                },
                {
                  name: '7번 노드',
                  value: 4,
                },
              ],
            },
          ],
        },
        {
          name: '영화',
          value: 13,
          wordmap: [
            {
              name: '영화',
              children: [
                {
                  name: '1번 노드',
                  value: 10,
                },
                {
                  name: '2번 노드',
                  value: 9,
                },
                {
                  name: '3번 노드',
                  value: 8,
                },
                {
                  name: '4번 노드',
                  value: 7,
                },
                {
                  name: '5번 노드',
                  value: 6,
                },
                {
                  name: '6번 노드',
                  value: 5,
                },
                {
                  name: '7번 노드',
                  value: 4,
                },
              ],
            },
          ],
        },
        {
          name: 'naver',
          value: 13,
          wordmap: [
            {
              name: 'naver',
              children: [
                {
                  name: '1번 노드',
                  value: 10,
                },
                {
                  name: '2번 노드',
                  value: 9,
                },
                {
                  name: '3번 노드',
                  value: 8,
                },
                {
                  name: '4번 노드',
                  value: 7,
                },
                {
                  name: '5번 노드',
                  value: 6,
                },
                {
                  name: '6번 노드',
                  value: 5,
                },
                {
                  name: '7번 노드',
                  value: 4,
                },
              ],
            },
          ],
        },
        {
          name: '개인',
          value: 11,
          wordmap: [
            {
              name: '개인',
              children: [
                {
                  name: '1번 노드',
                  value: 10,
                },
                {
                  name: '2번 노드',
                  value: 9,
                },
                {
                  name: '3번 노드',
                  value: 8,
                },
                {
                  name: '4번 노드',
                  value: 7,
                },
                {
                  name: '5번 노드',
                  value: 6,
                },
                {
                  name: '6번 노드',
                  value: 5,
                },
                {
                  name: '7번 노드',
                  value: 4,
                },
              ],
            },
          ],
        },
      ],
      current: 0,
    },
    line: [
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
    ],
  };
  return data;
}

function getData2(): IStarState {
  const data: IStarState = {
    video: [
      {
        type: 'analysis',
        data: [
          {
            id: '257R-JkTmcA',
            name: '시속 1,665km이상 달릴 수 없다면 죽어야하는 상상초월의 대재앙..',
            thumbnail: 'https://i.ytimg.com/vi/257R-JkTmcA/hqdefault.jpg',
          },
          {
            id: '9VzZ1G8X_I0',
            name: '상위 0.1% 재벌2세 참교육하는 상위 0.001% 재벌 형사(?)',
            thumbnail: 'https://i.ytimg.com/vi/9VzZ1G8X_I0/hqdefault.jpg',
          },
          {
            id: 'zS82ef7mQzw',
            name: '분장을 벗은 영화 캐릭터들의 G리는 실제 모습들..',
            thumbnail: 'https://i.ytimg.com/vi/zS82ef7mQzw/hqdefault.jpg',
          },
          {
            id: '257R-JkTmcA',
            name: '시속 1,665km이상 달릴 수 없다면 죽어야하는 상상초월의 대재앙..',
            thumbnail: 'https://i.ytimg.com/vi/257R-JkTmcA/hqdefault.jpg',
          },
          {
            id: '9VzZ1G8X_I0',
            name: '상위 0.1% 재벌2세 참교육하는 상위 0.001% 재벌 형사(?)',
            thumbnail: 'https://i.ytimg.com/vi/9VzZ1G8X_I0/hqdefault.jpg',
          },
        ],
      },
    ],
    keyword: {
      pie: [
        {
          name: '지무비',
          value: 17,
          wordmap: [
            {
              name: '지무비',
              children: [
                {
                  name: '1번 노드',
                  value: 10,
                },
                {
                  name: '2번 노드',
                  value: 9,
                },
                {
                  name: '3번 노드',
                  value: 8,
                },
                {
                  name: '4번 노드',
                  value: 7,
                },
                {
                  name: '5번 노드',
                  value: 6,
                },
                {
                  name: '6번 노드',
                  value: 5,
                },
                {
                  name: '7번 노드',
                  value: 4,
                },
              ],
            },
          ],
        },
        {
          name: '채널',
          value: 16,
          wordmap: [
            {
              name: '채널',
              children: [
                {
                  name: '1번 노드',
                  value: 10,
                },
                {
                  name: '2번 노드',
                  value: 9,
                },
                {
                  name: '3번 노드',
                  value: 8,
                },
                {
                  name: '4번 노드',
                  value: 7,
                },
                {
                  name: '5번 노드',
                  value: 6,
                },
                {
                  name: '6번 노드',
                  value: 5,
                },
                {
                  name: '7번 노드',
                  value: 4,
                },
              ],
            },
          ],
        },
        {
          name: '가입',
          value: 14,
          wordmap: [
            {
              name: '가입',
              children: [
                {
                  name: '1번 노드',
                  value: 10,
                },
                {
                  name: '2번 노드',
                  value: 9,
                },
                {
                  name: '3번 노드',
                  value: 8,
                },
                {
                  name: '4번 노드',
                  value: 7,
                },
                {
                  name: '5번 노드',
                  value: 6,
                },
                {
                  name: '6번 노드',
                  value: 5,
                },
                {
                  name: '7번 노드',
                  value: 4,
                },
              ],
            },
          ],
        },
        {
          name: '영화',
          value: 13,
          wordmap: [
            {
              name: '영화',
              children: [
                {
                  name: '1번 노드',
                  value: 10,
                },
                {
                  name: '2번 노드',
                  value: 9,
                },
                {
                  name: '3번 노드',
                  value: 8,
                },
                {
                  name: '4번 노드',
                  value: 7,
                },
                {
                  name: '5번 노드',
                  value: 6,
                },
                {
                  name: '6번 노드',
                  value: 5,
                },
                {
                  name: '7번 노드',
                  value: 4,
                },
              ],
            },
          ],
        },
        {
          name: 'naver',
          value: 13,
          wordmap: [
            {
              name: 'naver',
              children: [
                {
                  name: '1번 노드',
                  value: 10,
                },
                {
                  name: '2번 노드',
                  value: 9,
                },
                {
                  name: '3번 노드',
                  value: 8,
                },
                {
                  name: '4번 노드',
                  value: 7,
                },
                {
                  name: '5번 노드',
                  value: 6,
                },
                {
                  name: '6번 노드',
                  value: 5,
                },
                {
                  name: '7번 노드',
                  value: 4,
                },
              ],
            },
          ],
        },
        {
          name: '개인',
          value: 11,
          wordmap: [
            {
              name: '개인',
              children: [
                {
                  name: '1번 노드',
                  value: 10,
                },
                {
                  name: '2번 노드',
                  value: 9,
                },
                {
                  name: '3번 노드',
                  value: 8,
                },
                {
                  name: '4번 노드',
                  value: 7,
                },
                {
                  name: '5번 노드',
                  value: 6,
                },
                {
                  name: '6번 노드',
                  value: 5,
                },
                {
                  name: '7번 노드',
                  value: 4,
                },
              ],
            },
          ],
        },
      ],
      current: 0,
    },
  };
  return data;
}

function mapStateToProps(state: RootState) {
  console.log(state.star, state.period);
  return {
    useAble: {
      star: state.star.useAble,
      period: state.period.useAble,
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: (star: IStarState, period: IStarState) => {
      if (star && period) {
        dispatch(currentPage('star'));
        dispatch(starDataUpdate(star));
        dispatch(periodDataUpdate(period));
      }
    },
    stateFuncs: {
      starPie: (idx: number) => {
        dispatch(starPieSliceStateUpdate(idx));
      },
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function StarContainer({useAble, update, stateFuncs}: Props) {
  useEffect(() => {
    const sampleData = getData();
    const sampleData2 = getData2();
    update(sampleData, sampleData2);
  }, [update]);

  return <StarPresenter loading={useAble.star && useAble.period} funcs={stateFuncs} />;
}

export default connector(StarContainer);
