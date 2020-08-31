import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset}
    @import url("../Asset/fonts/S-Core-Dream-light/s-core-dream.css"); 
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
            
`;

export default globalStyles;
