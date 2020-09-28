import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import styled from 'styled-components';

import {RootState} from '../../store/store';
import {BGSecond} from '../../Components/Container/BGContiner';
import SearchBar from '../../Components/Container/SearchBar';

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
  height: 240px;
  border-radius: 10px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  background-color: #ffffff;
  margin-bottom: 20px;
`;

function mapStateToProps(state: RootState) {
  return {
    states: {
      data: state.searchYoutuber.data,
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

            <ResultContainer></ResultContainer>
            <ResultContainer></ResultContainer>
          </>
        )}
      </Container>
    </BGSecond>
  );
}

export default connector(SearchYoutuberPresenter);
