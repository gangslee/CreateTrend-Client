import {RootState, RootDispatch} from '../store/store';
import {userLoading} from '../store/reducers/auth';
import {getApi} from './api';
import {AxiosRequestConfig} from 'axios';

export interface IConfigProps {
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
}

export const loadUser = async (state: RootState, dispatch: RootDispatch) => {
  dispatch(userLoading);

  const token = state.auth.token;

  const config: AxiosRequestConfig = {};
  config.headers = {
    'Content-Type': 'application/json',
    Authorization: 'Token 729a6e177dda04f263a0453ea9114d405adc2a961dc1aea04acf1b9676827ed1',
  };

  // if (token) {
  // config.headers['Authorization'] =
  //   'Token 729a6e177dda04f263a0453ea9114d405adc2a961dc1aea04acf1b9676827ed1';
  // // }
  console.log(config);
  const data = await getApi.auth(config);
  data === null ? console.log('auth error') : console.log('auth good');
};

export const login = async (Username: string, Password: string, dispatch: RootDispatch) => {
  const config: IConfigProps = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({Username, Password});
  console.log(body);
  const data = await getApi.login(config, body);
  data === null ? console.log('login error') : console.log('login good');
};
