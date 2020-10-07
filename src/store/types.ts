export interface IWordMapData {
  name: string;
  children: {
    name: string;
    value: number;
    color?: string;
  }[];
  color?: string;
}

export interface ILineChartData {
  type: string;
  data: {
    date: string;
    value: number;
  }[];
}

export interface IPieChartData {
  country: string;
  litres: number;
}

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

export interface IVideoListData {
  type: string;
  data: {
    video_id: string;
    video_name: string;
    thumbnail_url: string;
    videokeywordnew?: {
      keyword: string;
    }[];
  }[];
  current?: number;
}
