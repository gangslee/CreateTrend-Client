import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch, searchTermUpdate} from '../../store';
import {Link} from 'react-router-dom';

const Container = styled.div`
  width: 990px;
  height: 65px;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.2);
  border: solid 2px #dd0909;
  border-radius: 5px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding-left: 20px;
  display: flex;
  align-items: center;
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
  :focus {
    outline: none;
  }
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
    update: (str: string) => dispatch(searchTermUpdate(str)),
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function SearchBar({searchStates, update}: Props) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update(e.target.value);
  };

  return (
    <Container>
      <Input onChange={handleOnChange} />
      <IconContainer>
        <Link to={`/${searchStates.searchType}/${searchStates.searchTerm}`}>
          <Icon src={require('../../Asset/images/Search.svg')} />
        </Link>
      </IconContainer>
    </Container>
  );
}

export default connector(SearchBar);
