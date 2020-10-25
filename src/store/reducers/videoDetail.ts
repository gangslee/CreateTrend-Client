import {createSlice} from '@reduxjs/toolkit';

interface IinitialStateProps {
    video: {
        video_views: number;
        video_popularity: number;
        avg_popularity: number;
        avg_videoviews: number;
        video: {
            video_name: string;
            video_id: string;
            thumbnail_url: string;
            video_description: string;
            videolikes: {
                likes:number;
                dislikes:number;
            }[],
            videokeywordnew: {
                keyword:string;
            }[]
        }
    };
    lines: {
        type: string;
        data:{
            date:string;
            value:number;
        }[]
    };
  channel: {
        thumbnail_url: string;
        channel_description: string;
        channel_name: string;
        subscriber_num: number;
    };
  isLoading: boolean;
}

const initialState: IinitialStateProps = {
  video: null,
  lines: null,
  channel:null,
  isLoading: true,
};

export const videoDetailSlice = createSlice({
  name: 'videoDetailReducer',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setData:(state, action)=>{
        state.channel = action.payload.channel;
        state.lines = action.payload.lines;
        state.video = action.payload.video;
        state.isLoading = false;
    }
  },
});

export const {
  setLoading,
  setData
} = videoDetailSlice.actions;
