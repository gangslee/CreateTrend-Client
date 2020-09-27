import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import styled, {css} from 'styled-components';

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
  searchKeyword: () => void;
}

function SearchYoutuberPresenter({states, searchKeyword}: ISearchYoutuberProps) {
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
    </BGSecond>
  );
}

export default connector(SearchYoutuberPresenter);
