import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';
import bg from '../Asset/images/bg.svg';

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
        padding-top:70px;
        background-image:url(${bg});
        font-family: "Lato", sans-serif;    
    }
    input:focus{
        outline: none;
    }
`;

export default globalStyles;
