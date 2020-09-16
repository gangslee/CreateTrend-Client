import React, {useLayoutEffect} from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';
import {Link} from 'react-router-dom';
import Tab from '../Container/Tab';

import {RootState, RootDispatch, searchTermUpdate, searchTypeUpdate} from '../../store/store';

const Container = styled.div`
  width: 990px;
`;

const TabContainer = styled.div`
  z-index: 1;
  width: 260px;
  height: 55px;
  font-family: 'S-CoreDream-5Medium';
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
`;

const InputContainer = styled.div`
  position: relative;
  height: 65px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.2);
  border: solid 2px #dd0909;
  border-radius: 5px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding-left: 20px;
  display: flex;
  align-items: center;
  margin-top: -5px;
`;

const Input = styled.input`
  width: 900px;
  font-family: 'S-CoreDream-5Medium';
  font-stretch: normal;
  font-style: normal;
  line-height: 16px;
  letter-spacing: normal;
  font-size: 16px;
  color: #222;
  border: none;
`;

const IconContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 100%;
  background-color: #dd0909;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

function mapStateToProps(state: RootState) {
  return {
    searchStates: {
      searchTerm: state.home.searchTerm,
      searchType: state.home.searchType,
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    updates: {
      searchTerm: (str: string) => dispatch(searchTermUpdate(str)),
      serachType: () => dispatch(searchTypeUpdate()),
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface ISearchBarProps extends Props {
  searchKeyword: () => void;
}

function SearchBar({searchStates, updates, searchKeyword}: ISearchBarProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updates.searchTerm(e.target.value);
  };

  const handleOnClickSearchIcon = async (e: React.MouseEvent) => {
    searchKeyword();
  };

  return (
    <Container>
      <TabContainer>
        <Tab type="search" stateFunc={updates.serachType} />
      </TabContainer>
      <InputContainer>
        <Input onChange={handleOnChange} value={searchStates.searchTerm} />
        <IconContainer>
          <Icon src={require('../../Asset/images/Search.svg')} onClick={handleOnClickSearchIcon} />
        </IconContainer>
      </InputContainer>
    </Container>
  );
}

export default connector(SearchBar);
