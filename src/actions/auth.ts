import {RootState, RootDispatch} from '../store/store';
import {userLoading} from '../store/reducers/auth';
import {getApi} from './api';

export interface IConfigProps {
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
}

export const loadUser = async (state: RootState, dispatch: RootDispatch) => {
  dispatch(userLoading);

  const token = state.auth.token;

  const config: IConfigProps = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['Authorization'] = `Toekn ${token}`;
  }

  const data = await getApi.auth(config);
  data === null ? console.log('auth error') : console.log('auth good');
};
