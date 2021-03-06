import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// 프로젝트 내 기본 style 초기화 및 font 설정
const globalStyles = createGlobalStyle`
    ${reset}
    
    a{
        text-decoration:none;
        color:inherit;  
    }
    *{
        box-sizing:border-box;
    }

    @font-face {
     font-family: 'S-CoreDream-5Medium';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff') format('woff');
     font-weight: normal;
     font-style: normal;
    }   
     @font-face {
     font-family: 'S-CoreDream-4Regular';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff');
     font-weight: normal;
     font-style: normal;
    }
    @font-face {
     font-family: 'S-CoreDream-6Bold';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff') format('woff');
     font-weight: normal;
     font-style: normal;
    }

    body{
        font-family: "Lato", 'Noto Sans KR',sans-serif;    
    }
    input:focus{
        outline: none;
    }
    button{
        border:none;
        :focus{
            outline:none;
        }
    }
`;

export default globalStyles;
