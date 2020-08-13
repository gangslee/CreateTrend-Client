import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, starDataUpdate, currentPage, IStarState} from '../../store';
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
      keyword: [
        {
          name: 'asdasd',
          pie: [],
          wordmap: [],
        },
      ],
      current: 0,
    },
  };
  return data;
}

function mapStateToProps(state: RootState) {
  return {
    useAble: state.star.useAble,
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: (data: IStarState) => {
      if (data) {
        dispatch(currentPage('star'));
        dispatch(starDataUpdate(data));
      }
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function StarContainer({useAble, update}: Props) {
  useEffect(() => {
    const sampleData = getData();
    update(sampleData);
  }, [update]);

  return <StarPresenter loading={useAble} />;
}

export default connector(StarContainer);
