import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-13-124-107-195.ap-northeast-2.compute.amazonaws.com:8000/',
});
