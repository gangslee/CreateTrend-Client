import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../store';

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
  return <div>123123</div>;
}

export default connector(ChannelInfo);
