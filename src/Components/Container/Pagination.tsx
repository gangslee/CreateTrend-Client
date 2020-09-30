import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState, RootDispatch} from '../../store/store';
import {
  prevPagination,
  nextPagination,
  currentPagination,
} from '../../store/reducers/searchYoutuber';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const BtContainer = styled.div``;

interface IBtProps {
  current: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const Bt = styled.span<IBtProps>`
  display: inline-block;
  padding: 12px;
  border-radius: 4px;
  border: solid 1px #dddddd;
  background-color: ${({current}) => (current ? '#d10909' : '#fff')};
  color: ${({current}) => (current ? '#fff' : '#666')};
  text-align: center;
  font-family: 'S-CoreDream-4Regular';
  letter-spacing: -0.5px;
  font-size: 12px;
  cursor: ${({current}) => !current && 'pointer'};
`;

function mapStateToProps(state: RootState) {
  return {
    states: {
      pageCnt: state.searchYoutuber.data ? state.searchYoutuber.data.length : null,
      currentPage: state.searchYoutuber.page,
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      next: () => dispatch(nextPagination()),
      prev: () => dispatch(prevPagination()),
      setPage: (idx: number) => dispatch(currentPagination(idx)),
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function Pagination({states, dispatches}: Props) {
  const maxPage = states.pageCnt % 4 === 0 ? states.pageCnt / 4 : states.pageCnt / 4 + 1;
  const pageIdx: number[] = [];

  for (
    let i = Math.floor(states.currentPage / 10 + 1);
    i <= Math.floor((states.currentPage / 10 + 1) * 10);
    i++
  ) {
    if (i > maxPage) {
      break;
    }
    pageIdx.push(i);
  }

  const handleOnClickPrev = (e: React.MouseEvent) => {
    if (states.currentPage - 10 > 0) {
      dispatches.prev();
    }
  };

  const handleOnClickNext = (e: React.MouseEvent) => {
    if (maxPage >= pageIdx[0] + 10) {
      dispatches.next();
    }
  };

  const handleOnClickBt = (e: React.MouseEvent) => {
    if (states.currentPage !== parseInt(e.currentTarget.innerHTML)) {
      dispatches.setPage(parseInt(e.currentTarget.innerHTML));
    }
  };

  return (
    <Container>
      <BtContainer>
        {pageIdx[0] !== 1 && (
          <Bt onClick={handleOnClickPrev} current={false}>
            이전 10개 보기
          </Bt>
        )}

        {states.pageCnt !== 0 ? (
          pageIdx.map((page, index) => (
            <Bt onClick={handleOnClickBt} key={index} current={page === states.currentPage}>
              {page}
            </Bt>
          ))
        ) : (
          <Bt onClick={handleOnClickBt} current={true}>
            1
          </Bt>
        )}
        {maxPage >= pageIdx[0] + 10 && (
          <Bt onClick={handleOnClickNext} current={false}>
            10개 더보기
          </Bt>
        )}
      </BtContainer>
    </Container>
  );
}

export default connector(Pagination);
