import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';

import { BGSecond } from '../../Components/Container/BGContiner';
import LineChart from '../../Components/Charts/LineChart';
import Loader from '../../Components/Container/Loader';
import Red from '../../Components/Text/Red';
import Slogan from '../../Components/Text/Slogan';
import { connector, IProps } from './connector/presenter';

const Container = styled.div`
  width: 1220px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SloganContainer = styled.div`
  margin-top: 60px;
`;

const UploadSection = styled.div`
  width: 100%;
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

const KeywordContainer = styled.div`
  margin: 30px 0px;
  padding: 0px 30px;
`;

const KeywordForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
`;

const AdvanceIcon = styled.img`
  width: 24px;
  height: 12px;
  position: absolute;
  top: 40%;
  right: 0;
  :hover {
    cursor: pointer;
  }
`;

const KeywordList = styled.div`
  margin: 20px 0px;
`;

const Keyword = styled.span`
  display: inline-block;
  padding: 16px 24px;
  background-color: #dee0eb;
  color: #666;
  border-radius: 15px;
  text-align: center;
  font-family: 'S-CoreDream-4Regular';
  font-size: 14px;
  :not(:last-child) {
    margin-right: 15px;
  }
  position: relative;
`;

const Remove = styled.span`
  position: absolute;
  top: 8px;
  right: 12px;
  font-family: 'S-CoreDream-6Bold';
  font-size: 6px;
  color: #888;
  :hover {
    cursor: pointer;
    color: #555;
  }
`;

const KeywordResultContainer = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 23.9%);
  grid-gap: 20px 15px;
`;

interface IImageContaineProps {
  current: boolean;
}

const ImageContainer = styled.div<IImageContaineProps>`
  display: inline-block;
  background-color: white;
  padding: 15px 15px 20px 15px;
  border: ${({ current }) => (current ? '3px solid #ecf1ff' : '1px solid #eee')};
  box-shadow: 10px 10px 20px 0 rgba(95, 111, 174, 0.1);
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
`;

const ChannelInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ChannelTitle = styled.div`
  height: 20px;
  font-family: 'S-CoreDream-5Medium';
  font-size: 14px;
  line-height: 1.3;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  border-radius: 10px;
`;

const VideoTitle = styled.div`
  height: 42px;
  font-family: 'S-CoreDream-4Regular';
  font-size: 15px;
  line-height: 1.4;
  margin-top: 10px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const InputContainer = styled.form`
  padding: 30px 0px;
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
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
  padding-right: 60px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'S-CoreDream-5Medium';
`;

const InputText = styled.input`
  width: 100%;
  font-family: 'S-CoreDream-5Medium';
  font-size: 16px;
  line-height: 1.8;
  color: #666;
  padding-bottom: 5px;
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

const Ref = styled.div`
  margin-top: 30px;
`;

const ChartTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 150px;
`;

const ChartText = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

function PredictPresenter({ states, dispatches, getData, getDataFromKeyword }: IProps) {
  const { getRootProps, getInputProps } = useDropzone({
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
    dispatches.setTextData({
      ...states.data.text,
      [e.target.name]: e.target.value,
    });
  };

  const scrollToRef = (ref: React.MutableRefObject<HTMLDivElement>) => {
    window.scrollTo(0, ref.current.offsetTop - 300);
  };

  const uploadRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleOnSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    scrollToRef(chartRef);
    getData();
  };

  const handleOnSubmitKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatches.pushKeyword(e.currentTarget.id);
    getDataFromKeyword();
    removeTerm(e.currentTarget.firstChild as HTMLInputElement);
  };

  const removeTerm = (input: HTMLInputElement) => {
    input.value = null;
  };

  const handleOnClickKeyword = (e: React.MouseEvent<HTMLSpanElement>) => {
    dispatches.filterKeyword(e.currentTarget.classList[2], e.currentTarget.nextSibling.nodeValue);
    states.data.keywordList.keyword.length > 0 && getDataFromKeyword();
  };

  const handleOnClickImageContaier = (e: React.MouseEvent<HTMLDivElement>) => {
    const idx = Number.parseInt(e.currentTarget.id);

    if (idx !== states.data.keywordResult.current) {
      dispatches.setKeywordResultCurrent(idx);
      const name: HTMLInputElement = document.querySelector('#titleInput');
      name.value = states.data.keywordResult.data[idx].video_name;
      dispatches.setTextData({
        ...states.data.text,
        title: states.data.keywordResult.data[idx].video_name,
      });
      dispatches.setThumbnail(states.data.keywordResult.data[idx].video_thumbnail_url);
      scrollToRef(uploadRef);
    }
  };

  const handleOnClickAdvance = (e: React.MouseEvent) => {
    dispatches.setAdvance();
    getDataFromKeyword();
  };

  return (
    <>
      <Helmet
        title="Create Trend ㅣ 조회수 예측"
        link={[{ rel: 'icon', type: 'image/png', href: 'symbol.png' }]}
      />
      <BGSecond>
        <Container>
          <SloganContainer>
            <Slogan>
              "<Red>AI Assistant</Red>와 함께 당신의 영상의 <Red>조회수를 예측</Red>해 보세요"
            </Slogan>
          </SloganContainer>
          <UploadSection>
            <Subtitle>키워드 선택</Subtitle>
            <KeywordContainer>
              <KeywordForm id="keyword-form" onSubmit={handleOnSubmitKeyword}>
                <InputText
                  type="text"
                  name="keyword"
                  placeholder="업로드 영상 관련 키워드 검색"
                  onChange={handleOnChange}
                />
                <AdvanceIcon
                  src={require(`../../Asset/images/${
                    states.data.isAdvance ? 'top-arrow' : 'bottom-arrow'
                  }.svg`)}
                  onClick={handleOnClickAdvance}
                />
              </KeywordForm>
              <KeywordList>
                {states.data.keywordList.keyword.length > 0 &&
                  states.data.keywordList.keyword.map((keyword, index) => (
                    <Keyword key={index}>
                      <Remove className="keyword-remove" onClick={handleOnClickKeyword}>
                        X
                      </Remove>
                      {keyword}
                    </Keyword>
                  ))}
              </KeywordList>
              {states.data.isAdvance && (
                <>
                  <KeywordForm id="include-form" onSubmit={handleOnSubmitKeyword}>
                    <InputText
                      type="text"
                      name="include"
                      placeholder="반드시 포함하고 싶은 키워드 검색"
                      onChange={handleOnChange}
                    />
                  </KeywordForm>
                  <KeywordList>
                    {states.data.keywordList.include.length > 0 &&
                      states.data.keywordList.include.map((keyword, index) => (
                        <Keyword key={index}>
                          <Remove className="include-remove" onClick={handleOnClickKeyword}>
                            X
                          </Remove>
                          {keyword}
                        </Keyword>
                      ))}
                  </KeywordList>
                  <KeywordForm id="exclude-form" onSubmit={handleOnSubmitKeyword}>
                    <InputText
                      type="text"
                      name="exclude"
                      placeholder="제외하고 싶은 키워드 검색"
                      onChange={handleOnChange}
                    />
                  </KeywordForm>
                  <KeywordList>
                    {states.data.keywordList.exclude.length > 0 &&
                      states.data.keywordList.exclude.map((keyword, index) => (
                        <Keyword key={index}>
                          <Remove className="exclude-remove" onClick={handleOnClickKeyword}>
                            X
                          </Remove>
                          {keyword}
                        </Keyword>
                      ))}
                  </KeywordList>
                </>
              )}
              <KeywordResultContainer>
                {states.data.keywordResult.data.length > 0 &&
                  states.data.keywordList.keyword.length > 0 &&
                  states.data.keywordResult.data.map((data, index) => (
                    <ImageContainer
                      id={index.toString()}
                      key={data.idx}
                      current={data.idx === states.data.keywordResult.current}
                      onClick={handleOnClickImageContaier}
                    >
                      <ChannelInfoContainer>
                        <Avatar src={data.channel_thumbnail_url} />
                        <ChannelTitle>{data.channel_name}</ChannelTitle>
                      </ChannelInfoContainer>
                      <Image src={data.video_thumbnail_url} />
                      <VideoTitle>{data.video_name}</VideoTitle>
                    </ImageContainer>
                  ))}
              </KeywordResultContainer>
            </KeywordContainer>
            <Subtitle>조회수 예측</Subtitle>
            <InputContainer onSubmit={handleOnSubmitUpload}>
              <UploadContainer ref={uploadRef}>
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
                  id="titleInput"
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
            <Ref ref={chartRef}>
              {states.data.lines ? (
                <Minititle>
                  <Red>{states.data.date}</Red>에 업로드 되는 <Red> {states.data.title}</Red> 영상의
                  예상 조회수 측정 결과
                </Minititle>
              ) : (
                <Minititle>영상 예상 조회수 측정 결과</Minititle>
              )}
              <ChartContainer>
                {states.data.isLoading ? (
                  <LoaderContainer>
                    <Loader />
                  </LoaderContainer>
                ) : states.data.lines ? (
                  <LineChart type="predict" />
                ) : (
                  <ChartTextContainer>
                    <ChartText>
                      조회수가 궁금한 영상의 썸네일, 제목, 채널의 구독자 수 그리고 업로드 날짜를
                      입력해주세요
                    </ChartText>
                  </ChartTextContainer>
                )}
              </ChartContainer>
            </Ref>
          </UploadSection>
        </Container>
      </BGSecond>
    </>
  );
}

export default connector(PredictPresenter);
