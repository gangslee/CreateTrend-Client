import React, {useRef} from 'react';
import styled from 'styled-components';
import {useDropzone} from 'react-dropzone';
import {connect, ConnectedProps} from 'react-redux';

import {RootDispatch, RootState} from '../../store/store';
import {BGSecond} from '../../Components/Container/BGContiner';
import {setPredictData, setTextData} from '../../store/reducers/predict';
import LineChart from '../../Components/Charts/LineChart';
import Loader from '../../Components/Container/Loader';

const Container = styled.div`
  width: 1220px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Slogan = styled.div`
  font-family: 'S-CoreDream-5Medium';
  font-size: 30px;
  text-align: center;
  margin-top: 110px;
  margin-bottom: 30px;
`;

const Red = styled.span`
  color: #dd0909;
`;

const UploadSection = styled.div`
  width: 80%;
  margin: 50px auto;
  padding: 30px 40px;
  background-color: white;
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  border-radius: 10px;
`;
const Subtitle = styled.span`
  display: block;
  font-family: 'S-CoreDream-6Bold';
  font-size: 22px;
  line-height: 1.36;
`;

const Minititle = styled.span`
  display: block;
  font-family: 'S-CoreDream-6Bold';
  font-size: 20px;
  line-height: 1.36;
`;

const InputContainer = styled.form`
  padding: 30px 0px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const UploadContainer = styled.div`
  width: 59%;
  display: inline-flex;
  justify-content: center;
`;

const Upload = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #dbe0f5;
  width: 410px;
  height: 320px;
  padding: 0px 15px;
  box-sizing: border-box;
  cursor: pointer;
`;

const UploadImage = styled.img`
  width: 100px;
  height: 150px;
  margin-bottom: 20px;
`;

const Preview = styled.img`
  width: 250px;
  height: 150px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const UploadText = styled.div`
  font-family: 'S-CoreDream-6Bold';
  font-size: 18px;
  color: #dbe0f5;
  margin-bottom: 10px;
`;
const InfoContainer = styled.div`
  width: 39%;
  box-sizing: border-box;
  padding: 10px 0px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'S-CoreDream-5Medium';
`;

const InputText = styled.input`
  width: 100%;
  font-family: 'S-CoreDream-5Medium';
  font-size: 16px;
  line-height: 2.1;
  color: #222;
  padding-bottom: 10px;
  border: none;
  border-bottom: 2px solid #ccc;
  :focus {
    border-bottom: 2px solid #dbe0f5;
  }
  transition: border-bottom 0.3s linear;
`;
const SBT = styled.button`
  font-family: 'S-CoreDream-5Medium';
  width: 120px;
  padding: 15px 0px;
  margin: 0px auto;
  background-color: #dd0909;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  :active,
  :hover {
  }
  cursor: pointer;
`;

const DropZone = styled.div`
  :focus {
    outline: none;
  }
`;

const ChartContainer = styled.div`
  margin-top: 20px;
  height: 350px;
`;

const LoaderContainer = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function mapStateToProps(state: RootState) {
  return {
    states: {
      data: state.predict,
    },
  };
}

function mapDispatchToProps(dispatch: RootDispatch) {
  return {
    dispatches: {
      setThumbnail: (thumbnail: string | ArrayBuffer) => {
        dispatch(setPredictData({thumbnail}));
      },
      setTextData: (text: {title: string; subscriber: string; date: string}) => {
        dispatch(setTextData({...text}));
      },
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

interface IPredictPresenterProps extends Props {
  getData: () => void;
}

function PredictPresenter({states, dispatches, getData}: IPredictPresenterProps) {
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        let reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);
        reader.onloadend = function () {
          var base64data = reader.result;
          dispatches.setThumbnail(base64data);
        };
      }
    },
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatches.setTextData({...states.data.text, [e.target.name]: e.target.value});
  };

  const scrollToRef = (ref: React.MutableRefObject<HTMLDivElement>) =>
    window.scrollTo(0, ref.current.offsetTop);

  const myRef = useRef<HTMLDivElement>(null);

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scrollToRef(myRef);
    getData();
  };

  return (
    <BGSecond>
      <Container>
        <Slogan>
          "<Red>AI Assistant</Red>와 함께 당신의 영상의 <Red>조회수를 예측</Red>해 보세요"
        </Slogan>

        <UploadSection>
          <Subtitle>영상 정보</Subtitle>
          <InputContainer onSubmit={handleOnSubmit}>
            <UploadContainer>
              <DropZone {...getRootProps()}>
                <Upload {...getInputProps()} />
                <UploadLabel htmlFor="upload">
                  {states.data.thumbnail ? (
                    <Preview src={states.data.thumbnail} />
                  ) : (
                    <UploadImage src={require('../../Asset/images/image-file.svg')} />
                  )}
                  <UploadText>조회수를 예측하고 싶은 썸네일을 올려주세요!</UploadText>
                  <UploadText>(.png, .jpg 파일만 가능합니다.)</UploadText>
                </UploadLabel>
              </DropZone>
            </UploadContainer>
            <InfoContainer>
              <InputText
                type="text"
                name="title"
                placeholder="영상 제목"
                onChange={handleOnChange}
              />
              <InputText
                type="text"
                name="subscriber"
                placeholder="구독자수  EX) 100000"
                onChange={handleOnChange}
              />
              <InputText
                type="text"
                name="date"
                placeholder="업로드 날짜  EX) 2020-01-01"
                onChange={handleOnChange}
              />
              <SBT>예측하기</SBT>
            </InfoContainer>
          </InputContainer>
          <div ref={myRef}>
            {states.data.isLoading ? (
              <LoaderContainer>
                <Loader />
              </LoaderContainer>
            ) : (
              states.data.lines && (
                <>
                  <Minititle>
                    <Red>{states.data.text.date}</Red>에 업로드 되는{' '}
                    <Red> {states.data.text.title}</Red> 영상의 예상 조회수
                  </Minititle>
                  <ChartContainer>
                    <LineChart type="predict" />
                  </ChartContainer>
                </>
              )
            )}
          </div>
        </UploadSection>
      </Container>
    </BGSecond>
  );
}

export default connector(PredictPresenter);
