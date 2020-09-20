import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store/store';

const Container = styled.div`
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  padding: 20px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  :first-child {
    color: #feb100;
    margin-right: 5px;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const Comment = styled.div`
  width: 300px;
  padding: 3px;
  border: 1px solid #ccc;
  /* background-color: #fafafa; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

interface IImageProps {
  bgUrl: string;
}

const Image = styled.div`
  width: 200px;
  height: 100px;
  background-image: url(${({bgUrl}: IImageProps) => bgUrl});
  background-size: cover;
  background-position: center center;
  transition: opacity 0.3s linear;
  &:hover {
    opacity: 0.7;
  }
`;

function mapStateToProps(state: RootState) {
  return {data: state.keyword};
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function CommentList({data}: Props) {
  return (
    // <Container>
    //   <Title>리그오브레전드</Title>
    //   <Title>댓글 모음</Title>
    //   {data ? (
    //     data.map((data, index) => (
    //       <ItemContainer key={index}>
    //         <Avatar src={data.avatar} />
    //         <Comment>{data.comment}</Comment>
    //         <a href={data.link} target="blank">
    //           <Image bgUrl={data.thumbnail} />
    //         </a>
    //       </ItemContainer>
    //     ))
    //   ) : (
    //     <></>
    //   )}
    // </Container>
    <div>Comment</div>
  );
}

export default connector(CommentList);
