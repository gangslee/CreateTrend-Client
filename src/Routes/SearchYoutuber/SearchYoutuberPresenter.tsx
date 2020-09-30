import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import styled from 'styled-components';

import {RootState} from '../../store/store';
import {BGSecond} from '../../Components/Container/BGContiner';
import SearchBar from '../../Components/Container/SearchBar';

const TEN_THOUSANDS = 10000;
const HUNDREAD_MILLIONS: number = 100000000;
const REGEX = /\B(?=(\d{3})+(?!\d))/g;

const Slogan = styled.div`
  font-family: 'S-CoreDream-5Medium';
  font-size: 30px;
  text-align: center;
  margin: 70px 0px;
`;

const SloganRed = styled.span`
  color: #dd0909;
`;

const SearchBarContainer = styled.form`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 1200px;
  margin: 50px auto;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0px;
  border-bottom: 1px solid #dbe0f5;
`;

const Title = styled.span`
  font-size: 25px;
  color: #333;
  line-height: 1.4;
`;

const TitleRed = styled.span`
  color: #d10909;
`;

const TitleIcon = styled.img`
  width: 35px;
  height: 37px;
  margin-right: 15px;
`;

const SubtitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 10px;
`;

const Subtitle = styled.span`
  display: inline-block;
  font-size: 22px;
  line-height: 1.36;
`;

const Count = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 30px;
  border-radius: 30px;
  margin-left: 15px;
  font-size: 14px;
  color: #fff;
  background-color: #d10909;
  text-align: center;
`;

const ResultContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 240px;
  padding: 40px 30px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  background-color: #ffffff;
  :not(:last-child) {
    margin-bottom: 30px;
  }
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const ChannelInfoContainer = styled.div`
  width: 25%;
  display: inline-block;
  height: 100%;
  padding-top: 15px;
  padding-bottom: 45px;
`;

const ChannelInfoLineContainer = styled.div`
  display: flex;
  align-items: center;
  height: 85%;
  box-sizing: border-box;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

const IconInfo = styled.span`
  display: inline-block;
  font-family: 'S-CoreDream-4Regular';
  font-size: 14px;
  :not(:last-child) {
    margin-right: 14px;
  }
`;

const ChannelDetailContainer = styled.div`
  /* margin: 0px 30px; */
`;

const ChannelDetailLineContainer = styled.div`
  display: inline-block;
`;

const DetailInfoContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  :first-child {
    margin-right: 30px;
  }
`;

const DetailInfoTitle = styled.span`
  font-family: 'S-CoreDream-4Regular';
  font-size: 13px;
  line-height: 2.69;
  color: #999;
`;

const DetailInfoItem = styled.span`
  font-size: 20px;
  line-height: 1.75;
`;

const ThumbnailContainer = styled.div`
  width: 410px;
  display: inline-flex;
  justify-content: space-between;
  margin-left: 50px;
`;

const Thumbnail = styled.img`
  width: 190px;
  height: 120px;
  border-radius: 5px;
`;

function mapStateToProps(state: RootState) {
  return {
    states: {
      data: state.searchYoutuber.data,
      page: state.searchYoutuber.page,
    },
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface ISearchYoutuberProps extends Props {
  youtuberName: string;
  searchKeyword: () => void;
}

function SearchYoutuberPresenter({states, youtuberName, searchKeyword}: ISearchYoutuberProps) {
  const start = states.data && 0 + 5 * (states.page - 1);
  const end = states.data && (states.data.length - 1 >= start + 3 ? start + 4 : states.data.length);

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchKeyword();
  };

  return (
    <BGSecond>
      <Slogan>
        "궁금한 <SloganRed>스타채널</SloganRed>을 검색해 보세요"
      </Slogan>
      <SearchBarContainer onSubmit={handleOnSubmit}>
        <SearchBar searchKeyword={searchKeyword} />
      </SearchBarContainer>
      <Container>
        <TitleContainer>
          <TitleIcon
            src={require('../../Asset/images/hashtag.png')}
            srcSet={
              (require('../../Asset/images/hashtag@2x.png'),
              require('../../Asset/images/hashtag@3x.png'))
            }
          />
          <Title>
            <TitleRed>{youtuberName}</TitleRed> 키워드 검색 결과
          </Title>
        </TitleContainer>
        {states.data && (
          <>
            <SubtitleContainer>
              <Subtitle>검색결과</Subtitle>
              <Count>{states.data.length}</Count>
            </SubtitleContainer>
            {states.data.slice(start, end).map((data) => (
              <ResultContainer key={data.idx}>
                <Avatar src={data.thumbnail_url} />
                <ChannelInfoContainer>
                  <Subtitle>{data.channel_name}</Subtitle>
                  <ChannelInfoLineContainer>
                    <Icon
                      src={require('../../Asset/images/view_icon.png')}
                      srcSet={
                        (require('../../Asset/images/view_icon@2x.png'),
                        require('../../Asset/images/view_icon@3x.png'))
                      }
                    />
                    <IconInfo>
                      {data.subscriber_num === 0
                        ? '비공개'
                        : data.subscriber_num >= HUNDREAD_MILLIONS
                        ? `${(data.subscriber_num / HUNDREAD_MILLIONS).toFixed(1)}억명`
                        : data.subscriber_num >= TEN_THOUSANDS
                        ? `${(data.subscriber_num / TEN_THOUSANDS).toFixed(1)}만명`
                        : `${data.subscriber_num.toString().replace(REGEX, ',')}명`}
                    </IconInfo>

                    <Icon src={require('../../Asset/images/hits_icon.svg')} />

                    <IconInfo>
                      {data.max_views_count >= HUNDREAD_MILLIONS
                        ? `${(data.max_views_count / HUNDREAD_MILLIONS).toFixed(0)}억`
                        : data.max_views_count >= TEN_THOUSANDS
                        ? `${(data.max_views_count / TEN_THOUSANDS).toFixed(0)}만`
                        : `${data.max_views_count.toString().replace(REGEX, ',')}`}
                    </IconInfo>

                    <Icon src={require('../../Asset/images/video_icon.svg')} />
                    <IconInfo>
                      {data.video_counts >= HUNDREAD_MILLIONS
                        ? `${(data.video_counts / HUNDREAD_MILLIONS).toFixed(0)}억개`
                        : data.video_counts >= TEN_THOUSANDS
                        ? `${(data.video_counts / TEN_THOUSANDS).toFixed(0)}만개`
                        : `${data.video_counts.toString().replace(REGEX, ',')}개`}
                    </IconInfo>
                  </ChannelInfoLineContainer>
                </ChannelInfoContainer>
                <ChannelDetailContainer>
                  <ChannelDetailLineContainer>
                    <DetailInfoContainer>
                      <DetailInfoTitle>조회수/구독자수</DetailInfoTitle>
                      <DetailInfoItem>
                        {data.subscriber_num === 0
                          ? '구독자수 비공개'
                          : `${(
                              data.max_views_count /
                              data.video_counts /
                              data.subscriber_num
                            ).toFixed(2)}%`}
                      </DetailInfoItem>
                    </DetailInfoContainer>
                    <DetailInfoContainer>
                      <DetailInfoTitle>평균조회수</DetailInfoTitle>
                      <DetailInfoItem>
                        {data.max_views_count / data.video_counts >= HUNDREAD_MILLIONS
                          ? `${(
                              data.max_views_count /
                              data.video_counts /
                              HUNDREAD_MILLIONS
                            ).toFixed(1)}억`
                          : data.max_views_count / data.video_counts >= TEN_THOUSANDS
                          ? `${(data.max_views_count / data.video_counts / TEN_THOUSANDS).toFixed(
                              1
                            )}만`
                          : `${(data.max_views_count / data.video_counts)
                              .toString()
                              .replace(REGEX, ',')}`}
                      </DetailInfoItem>
                    </DetailInfoContainer>
                  </ChannelDetailLineContainer>
                </ChannelDetailContainer>
                <ThumbnailContainer>
                  <Thumbnail src={data.recent_videos[0]} />
                  <Thumbnail src={data.recent_videos[1]} />
                </ThumbnailContainer>
              </ResultContainer>
            ))}
          </>
        )}
      </Container>
    </BGSecond>
  );
}

export default connector(SearchYoutuberPresenter);
