// 각 reducer들에서 사용되는 차트들의 구현에 사용되는 data들의 custom type 폼 선언

export interface IWordMapData {
  name: string;
  children: {
    name: string;
    value: number;
    color?: string;
  }[];
  color?: string;
}
// WordMap에 사용되는 data 폼을 type으로 선언

export interface ILineChartData {
  type: string;
  data: {
    date: string;
    value: number;
  }[];
}
// LineChart에 사용되는 data 폼을 type으로 선언

export interface IPieChartData {
  country: string;
  litres: number;
}
// PieChart에 사용되는 data 폼을 type으로 선언

export interface IKeywordChartData {
  keyword: {
    name: string;
    value: number;
    popular?: number;
    wordmap?: IWordMapData;
    line?: ILineChartData[];
    video?: IVideoListData[];
    visit?: boolean;
  }[];
  type?: string;
  current?: number;
}
// KeywordChart에 사용되는 data 폼을 type으로 선언

export interface IVideoListData {
  type: string;
  data: {
    idx: number;
    video_id: string;
    video_name: string;
    thumbnail_url: string;
    videokeywordnew?: {
      keyword: string;
    }[];
    popularity?: number;
    views?: number;
  }[];
  current?: number;
}
// VideoList에 사용되는 data 폼을 type으로 선언
