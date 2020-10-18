import React from 'react'
import styled from 'styled-components';
import {useDropzone} from 'react-dropzone'
import {connect, ConnectedProps} from 'react-redux';

import {RootDispatch, RootState} from '../../store/store';
import { BGFirst } from '../../Components/Container/BGContiner';
import { setPredictData } from '../../store/reducers/predict';


const Container = styled.div`
   width:1220px;
   margin:0px auto;
   display:flex;
   flex-direction:column;
   justify-content:center;
   align-items:center;
`
const Slogan = styled.div`
  font-family: 'S-CoreDream-5Medium';
  font-size: 30px;
  text-align: center;
  margin-top:110px;
  margin-bottom:30px;
`;

const SloganRed = styled.span`
  color: #dd0909;
`;

const UploadSection = styled.div`
    width:80%;
    margin:50px auto;
    padding:20px 35px;
    background-color:white;
    box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
    border-radius:10px;
`
const Subtitle = styled.span`
  display: block;
  font-family: 'S-CoreDream-6Bold';
  font-size: 22px;
  line-height: 1.36;
`;

const InputContainer = styled.div`
  padding:30px 0px;
  display:flex;
  justify-content:space-between;
`

const UploadContainer = styled.div`
  width:59%;
  display:inline-flex;
  justify-content:center;
`

const Upload = styled.input`
 display: none;
`

const UploadLabel = styled.label`
  display:inline-flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  border: 2px dashed #dbe0f5;
  width:410px;
  height:320px;
  padding:0px 15px; 
  box-sizing:border-box;
  cursor:pointer;
`

const UploadImage = styled.img`
  width:100px;
  height:150px;
  margin-bottom:20px;
`

const Preview = styled.img`
  width:250px;
  height:150px;
  margin-bottom:30px;
`

const UploadText = styled.div`
  font-family: 'S-CoreDream-6Bold';
  font-size:18px;
  color:#dbe0f5;
  margin-bottom:10px;
`
const InfoContainer = styled.div`
  width:39%;
  box-sizing:border-box;
  padding:10px 0px;
  display:inline-flex;
  flex-direction:column;
  justify-content:space-between;
  font-family: "S-CoreDream-5Medium";
`

const InputText = styled.input`
  width:100%;
  font-family: "S-CoreDream-5Medium";
  font-size: 16px;
  line-height:2.1;
  color: #222;
  border:none;
  border-bottom:2px solid #aaa;
  :focus{
    border-bottom:2px solid #dbe0f5;
  }
`
const SBT = styled.button`
  font-family: "S-CoreDream-5Medium";
  width:120px;
  padding:15px 0px; 
  margin:0px auto;
  background-color:#dd0909;
  color:white;
  font-size:18px;
  border:none;
  border-radius:10px;
`

const DropZone = styled.div`
  :focus{
    outline:none;
  }
`

function mapStateToProps(state: RootState) {
  return {
    states: {
      data: state.predict
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      setData:(thumbnail:string)=>{
        dispatch(setPredictData({thumbnail}))
      }
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function PredictPresenter({states, dispatches}:Props){

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop:acceptedFiles=>{
      acceptedFiles.length!==0 &&
      dispatches.setData(
        acceptedFiles.map((file:any)=>Object.assign(file,{
          preview: URL.createObjectURL(file)
        }))[0].preview
      )
    }, 
    })
    return <BGFirst>
        <Container>
        <Slogan>
        "<SloganRed>AI Assistant</SloganRed>와 함께 당신의 영상의 <SloganRed>조회수를 예측</SloganRed>해 보세요"
        </Slogan>
      
      <UploadSection>
          <Subtitle>영상 정보</Subtitle>
          <InputContainer>
            <UploadContainer>
            <DropZone {...getRootProps()} >
              <Upload {...getInputProps()} />
              <UploadLabel htmlFor="upload">
                {states.data.thumbnail? <Preview src={states.data.thumbnail}/>: <UploadImage src={require('../../Asset/images/image-file.svg')}/>}
                <UploadText>조회수를 예측하고 싶은 썸네일을 올려주세요!</UploadText>
                <UploadText>(.png, .jpg 파일만 가능합니다.)</UploadText>
              </UploadLabel>
              </DropZone>
              
            </UploadContainer>
            <InfoContainer>
              <InputText type="text" placeholder="영상 제목"/>
              <InputText type="text" placeholder="구독자수  EX) 10만 -> 100000"/>
              <InputText type="text" placeholder="업로드 날짜  EX) 2020-01-01"/>
              <SBT>예측하기</SBT>
            </InfoContainer>
          </InputContainer>
      </UploadSection>
        </Container>
    </BGFirst>
}

export default connector(PredictPresenter);