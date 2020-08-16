import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {
  RootState,
  RootDispatch,
  starDataUpdate,
  periodDataUpdate,
  starPieSliceStateUpdate,
  currentPage,
  IStarState,
} from '../../store';
import StarPresenter from './StarPresenter';
import {getApi} from '../../api';

interface OwnProps {
  match: {
    params: {
      id: string;
    };
  };
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  const {
    match: {
      params: {id},
    },
  } = ownProps;
  return {
    useAble: {
      star: state.star.useAble,
      period: state.period.useAble,
    },
    id: id,
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: (star: IStarState, period: IStarState) => {
      if (star && period) {
        dispatch(currentPage('star'));
        dispatch(starDataUpdate(star));
        dispatch(periodDataUpdate(period));
      }
    },
    stateFuncs: {
      starPie: (idx: number) => {
        dispatch(starPieSliceStateUpdate(idx));
      },
      periodLine: async (id: string, start: string, end: string) => {
        const {data} = await getApi.period(id, start, end);
        dispatch(periodDataUpdate(data));
      },
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function StarContainer({useAble, id, update, stateFuncs}: Props) {
  useEffect(() => {
    const fetchData = async (id: string, start: string, end: string) => {
      try {
        const starData = await (await getApi.star(id)).data;
        const periodData = await (await getApi.period(id, start, end)).data;
        update(starData, periodData);
      } catch (e) {
        console.log(e);
      } finally {
      }
    };
    const today = new Date();
    const end = today.toJSON().slice(0, 10);
    today.setDate(today.getDate() - 50);
    const start = today.toJSON().slice(0, 10);

    fetchData(id, start, end);
  }, [update, id]);

  return <StarPresenter loading={useAble.star && useAble.period} funcs={stateFuncs} id={id} />;
}

export default connector(StarContainer);
