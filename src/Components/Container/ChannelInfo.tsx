import React from 'react';
import styled from 'styled-components';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store';

const Container = styled.div`
  padding: 20px;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
`;

const DescContainer = styled.div`
  width: 50%;
  text-align: center;
`;

const ItemTitle = styled.span`
  display: inline-block;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Item = styled.span`
  font-size: 14px;
`;

const Desc = styled.div`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
`;

const InfoListContainer = styled.div``;

const InfoContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
`;

function mapStateToProps(state: RootState) {
  return {
    data: state.star.channelInfo,
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function ChannelInfo({data}: Props) {
  console.log(data);
  return (
    <Container>
      <ItemContainer>
        <Avatar src={data.thumbnail_url.replace('=s88', '=s300')} />
        <DescContainer>
          <ItemTitle>채널 설명</ItemTitle>
          <Desc>{data.channel_description}</Desc>
        </DescContainer>
        <InfoListContainer>
          <InfoContainer>
            <ItemTitle>채널명</ItemTitle>
            <Item>{data.channel_name}</Item>
          </InfoContainer>
          <InfoContainer>
            <ItemTitle>채널 개설일</ItemTitle>
            <Item>{data.channel_start_date}</Item>
          </InfoContainer>
          <InfoContainer>
            <ItemTitle>구독자수</ItemTitle>
            <Item>
              {data.subscriber > 1000000
                ? `${(data.subscriber / 1000000).toFixed(2)}M`
                : data.subscriber > 1000
                ? `${(data.subscriber / 1000).toFixed(2)}K`
                : data.subscriber}
            </Item>
          </InfoContainer>
        </InfoListContainer>
      </ItemContainer>
    </Container>
  );
}

export default connector(ChannelInfo);
