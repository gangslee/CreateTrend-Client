import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {
  RootState,
  RootDispatch,
  statisticsDataUpdate,
  chartStateUpdate,
  currentPage,
  keywordStateUpdate,
  IKeywordChartData,
} from '../../store';
import ChannelPresenter from './StatisticsPresenter';

function getData(): IKeywordChartData[] {
  const data = [
    {
      chartType: '인기',
      keyword: [
        {
          name: '리그오브레전드',
          popular: 90,
          wordmap: [
            {
              name: '리그오브레전드',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-01-01', value: 4500},
                {date: '2020-01-02', value: 2690},
                {date: '2020-01-03', value: 7000},
                {date: '2020-01-04', value: 4900},
                {date: '2020-01-05', value: 5000},
                {date: '2020-01-06', value: 4500},
                {date: '2020-01-07', value: 2690},
                {date: '2020-01-08', value: 7000},
                {date: '2020-01-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '1[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '배틀그라운드',
          popular: 91,
          wordmap: [
            {
              name: '배틀그라운드',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-02-01', value: 4500},
                {date: '2020-02-02', value: 2690},
                {date: '2020-02-03', value: 7000},
                {date: '2020-02-04', value: 4900},
                {date: '2020-02-05', value: 5000},
                {date: '2020-02-06', value: 4500},
                {date: '2020-02-07', value: 2690},
                {date: '2020-02-08', value: 7000},
                {date: '2020-02-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '2[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '피파온라인4',
          popular: 92,
          wordmap: [
            {
              name: '피파온라인4',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-03-01', value: 4500},
                {date: '2020-03-02', value: 2690},
                {date: '2020-03-03', value: 7000},
                {date: '2020-03-04', value: 4900},
                {date: '2020-03-05', value: 5000},
                {date: '2020-03-06', value: 4500},
                {date: '2020-03-07', value: 2690},
                {date: '2020-03-08', value: 7000},
                {date: '2020-03-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '3[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '메이플스토리',
          popular: 93,
          wordmap: [
            {
              name: '메이플스토리',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-04-01', value: 4500},
                {date: '2020-04-02', value: 2690},
                {date: '2020-04-03', value: 7000},
                {date: '2020-04-04', value: 4900},
                {date: '2020-04-05', value: 5000},
                {date: '2020-04-06', value: 4500},
                {date: '2020-04-07', value: 2690},
                {date: '2020-04-08', value: 7000},
                {date: '2020-04-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '4[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: 'GTA5',
          popular: 94,
          wordmap: [
            {
              name: 'GTA5',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-05-01', value: 4500},
                {date: '2020-05-02', value: 2690},
                {date: '2020-05-03', value: 7000},
                {date: '2020-05-04', value: 4900},
                {date: '2020-05-05', value: 5000},
                {date: '2020-05-06', value: 4500},
                {date: '2020-05-07', value: 2690},
                {date: '2020-05-08', value: 7000},
                {date: '2020-05-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '5[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '카트라이더',
          popular: 95,
          wordmap: [
            {
              name: '카트라이더',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-06-01', value: 4500},
                {date: '2020-06-02', value: 2690},
                {date: '2020-06-03', value: 7000},
                {date: '2020-06-04', value: 4900},
                {date: '2020-06-05', value: 5000},
                {date: '2020-06-06', value: 4500},
                {date: '2020-06-07', value: 2690},
                {date: '2020-06-08', value: 7000},
                {date: '2020-06-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '6[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '서든어택',
          popular: 96,
          wordmap: [
            {
              name: '서든어택',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-07-01', value: 4500},
                {date: '2020-07-02', value: 2690},
                {date: '2020-07-03', value: 7000},
                {date: '2020-07-04', value: 4900},
                {date: '2020-07-05', value: 5000},
                {date: '2020-07-06', value: 4500},
                {date: '2020-07-07', value: 2690},
                {date: '2020-07-08', value: 7000},
                {date: '2020-07-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '7[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '리니지',
          popular: 97,
          wordmap: [
            {
              name: '리니지',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-08-01', value: 4500},
                {date: '2020-08-02', value: 2690},
                {date: '2020-08-03', value: 7000},
                {date: '2020-08-04', value: 4900},
                {date: '2020-08-05', value: 5000},
                {date: '2020-08-06', value: 4500},
                {date: '2020-08-07', value: 2690},
                {date: '2020-08-08', value: 7000},
                {date: '2020-08-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '8[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: 'WOW',
          popular: 98,
          wordmap: [
            {
              name: 'WOW',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-09-01', value: 4500},
                {date: '2020-09-02', value: 2690},
                {date: '2020-09-03', value: 7000},
                {date: '2020-09-04', value: 4900},
                {date: '2020-09-05', value: 5000},
                {date: '2020-09-06', value: 4500},
                {date: '2020-09-07', value: 2690},
                {date: '2020-09-08', value: 7000},
                {date: '2020-09-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '9[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '오버워치',
          popular: 99,
          wordmap: [
            {
              name: '오버워치',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-10-01', value: 4500},
                {date: '2020-10-02', value: 2690},
                {date: '2020-10-03', value: 7000},
                {date: '2020-10-04', value: 4900},
                {date: '2020-10-05', value: 5000},
                {date: '2020-10-06', value: 4500},
                {date: '2020-10-07', value: 2690},
                {date: '2020-10-08', value: 7000},
                {date: '2020-10-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '10[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
      ],
      current: 0,
    },
    {
      chartType: '영상',
      keyword: [
        {
          name: '승급전',
          popular: 99,
          wordmap: [
            {
              name: '승급전',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-10-01', value: 4500},
                {date: '2020-10-02', value: 2690},
                {date: '2020-10-03', value: 7000},
                {date: '2020-10-04', value: 4900},
                {date: '2020-10-05', value: 5000},
                {date: '2020-10-06', value: 4500},
                {date: '2020-10-07', value: 2690},
                {date: '2020-10-08', value: 7000},
                {date: '2020-10-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '10[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: 'MMORPG',
          popular: 98,
          wordmap: [
            {
              name: 'MMORPG',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-09-01', value: 4500},
                {date: '2020-09-02', value: 2690},
                {date: '2020-09-03', value: 7000},
                {date: '2020-09-04', value: 4900},
                {date: '2020-09-05', value: 5000},
                {date: '2020-09-06', value: 4500},
                {date: '2020-09-07', value: 2690},
                {date: '2020-09-08', value: 7000},
                {date: '2020-09-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '8[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '9[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '스팀신작',
          popular: 97,
          wordmap: [
            {
              name: '스팀신작',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-08-01', value: 4500},
                {date: '2020-08-02', value: 2690},
                {date: '2020-08-03', value: 7000},
                {date: '2020-08-04', value: 4900},
                {date: '2020-08-05', value: 5000},
                {date: '2020-08-06', value: 4500},
                {date: '2020-08-07', value: 2690},
                {date: '2020-08-08', value: 7000},
                {date: '2020-08-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '8[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: 'LCK',
          popular: 96,
          wordmap: [
            {
              name: 'LCK',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-07-01', value: 4500},
                {date: '2020-07-02', value: 2690},
                {date: '2020-07-03', value: 7000},
                {date: '2020-07-04', value: 4900},
                {date: '2020-07-05', value: 5000},
                {date: '2020-07-06', value: 4500},
                {date: '2020-07-07', value: 2690},
                {date: '2020-07-08', value: 7000},
                {date: '2020-07-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '7[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '방플',
          popular: 95,
          wordmap: [
            {
              name: '방플',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-06-01', value: 4500},
                {date: '2020-06-02', value: 2690},
                {date: '2020-06-03', value: 7000},
                {date: '2020-06-04', value: 4900},
                {date: '2020-06-05', value: 5000},
                {date: '2020-06-06', value: 4500},
                {date: '2020-06-07', value: 2690},
                {date: '2020-06-08', value: 7000},
                {date: '2020-06-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '6[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    '6https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '듀오',
          popular: 94,
          wordmap: [
            {
              name: '듀오',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-05-01', value: 4500},
                {date: '2020-05-02', value: 2690},
                {date: '2020-05-03', value: 7000},
                {date: '2020-05-04', value: 4900},
                {date: '2020-05-05', value: 5000},
                {date: '2020-05-06', value: 4500},
                {date: '2020-05-07', value: 2690},
                {date: '2020-05-08', value: 7000},
                {date: '2020-05-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '5[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '모바일게임',
          popular: 93,
          wordmap: [
            {
              name: '모바일게임',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-04-01', value: 4500},
                {date: '2020-04-02', value: 2690},
                {date: '2020-04-03', value: 7000},
                {date: '2020-04-04', value: 4900},
                {date: '2020-04-05', value: 5000},
                {date: '2020-04-06', value: 4500},
                {date: '2020-04-07', value: 2690},
                {date: '2020-04-08', value: 7000},
                {date: '2020-04-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '4[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '김민교',
          popular: 92,
          wordmap: [
            {
              name: '김민교',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-03-01', value: 4500},
                {date: '2020-03-02', value: 2690},
                {date: '2020-03-03', value: 7000},
                {date: '2020-03-04', value: 4900},
                {date: '2020-03-05', value: 5000},
                {date: '2020-03-06', value: 4500},
                {date: '2020-03-07', value: 2690},
                {date: '2020-03-08', value: 7000},
                {date: '2020-03-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '3[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '신작게임',
          popular: 91,
          wordmap: [
            {
              name: '신작게임',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-02-01', value: 4500},
                {date: '2020-02-02', value: 2690},
                {date: '2020-02-03', value: 7000},
                {date: '2020-02-04', value: 4900},
                {date: '2020-02-05', value: 5000},
                {date: '2020-02-06', value: 4500},
                {date: '2020-02-07', value: 2690},
                {date: '2020-02-08', value: 7000},
                {date: '2020-02-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '2[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
        {
          name: '카드깡',
          popular: 90,
          wordmap: [
            {
              name: '카드깡',
              children: [
                {
                  name: '롤',
                  value: 200,
                },
                {
                  name: '넥서스',
                  value: 180,
                },
                {
                  name: '라이엇',
                  value: 160,
                },
                {
                  name: '볼리베어',
                  value: 140,
                },
                {
                  name: '페이커',
                  value: 120,
                },
                {
                  name: 'LCK',
                  value: 100,
                },
                {
                  name: '담원',
                  value: 80,
                },
              ],
            },
          ],
          line: [
            {
              name: '인기도 추이',
              data: [
                {date: '2020-01-01', value: 4500},
                {date: '2020-01-02', value: 2690},
                {date: '2020-01-03', value: 7000},
                {date: '2020-01-04', value: 4900},
                {date: '2020-01-05', value: 5000},
                {date: '2020-01-06', value: 4500},
                {date: '2020-01-07', value: 2690},
                {date: '2020-01-08', value: 7000},
                {date: '2020-01-09', value: 4900},
              ],
            },
          ],
          video: [
            {
              type: 'analysis',
              data: [
                {
                  id: 'Y34wmDantyM',
                  name: '1[롤] 감스트 그 분이 왔습니다 ㄷㄷ LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/Y34wmDantyM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD79Ay1YDwEcRCV0RaaZb1weyi9cQ',
                  keyword: ['롤', '감스트', '가렌', '게스트', '쓰리컨드'],
                },
                {
                  id: 'kpHFdVjLQbA',
                  name: '[롤] 감스트 브론즈1 100점 찍었습니다! 실버가 보인다!! LOL',
                  thumbnail:
                    'https://i.ytimg.com/vi/kpHFdVjLQbA/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAg1lewAEE_CTH0pPNsJ038MNlkEw',
                  keyword: ['롤', '감스트', '승격전', '브론즈', '실버'],
                },
                {
                  id: 'my4j1Z5c88A',
                  name: '신챔프 수학 출시 임박, 요네 심화 정보',
                  thumbnail:
                    'https://i.ytimg.com/vi/my4j1Z5c88A/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAlzviTWyij1i9bTwqlNmwLn9Y0BA',
                  keyword: ['롤박사 해도리', '패치노트', '10.16', '야스오', '요네'],
                },
                {
                  id: 'K4mI_q1I5lU',
                  name: '롤 신스킨에 레바의 손길이 닿아버렸습니다',
                  thumbnail:
                    'https://i.ytimg.com/vi/K4mI_q1I5lU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAfYFUV6pi6JZvvvejci358Nq8yZw',
                  keyword: ['레바', '신스킨', '킨드레드', '그림방송', '트위치'],
                },
                {
                  id: 'zKTXxy9Z6hs',
                  name: "다시 돌아온 100만 조회수의 '그 버그'",
                  thumbnail:
                    'https://i.ytimg.com/vi/zKTXxy9Z6hs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC_YbxETJgUGGwAQBsshOdbGb6JIw',
                  keyword: ['롤', '롤박사 해도리', '버그', '노틸러스', '챔피언'],
                },
              ],
              current: 0,
            },
          ],
        },
      ],
      current: 0,
    },
  ];

  return data;
}

function mapStateToProps(state: RootState) {
  return {
    useAble: state.statistics.useAble,
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    update: (data: IKeywordChartData[]) => {
      if (data) {
        dispatch(currentPage('statistics'));
        dispatch(statisticsDataUpdate(data));
      }
    },
    stateFuncs: {
      chart: () => {
        dispatch(chartStateUpdate());
      },
      keyword: (n: number) => {
        dispatch(keywordStateUpdate(n));
      },
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function ChannelContainer({useAble, update, stateFuncs}: Props) {
  useEffect(() => {
    const sampleData = getData();
    update(sampleData);
  }, [update]);

  return <ChannelPresenter funcs={stateFuncs} loading={useAble} />;
}

export default connector(ChannelContainer);
