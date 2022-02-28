import { createGlobalStyle } from 'styled-components';
import imgBackGround from '../assets/background.svg';

export const GlobalStyle = createGlobalStyle`
 *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
 }

 html{
     @media (max-width: 1080px) {
        font-size: 93.75%;
     }

     @media (max-width: 720px) {
        font-size: 87.5%;
     }
 }
  body{
    background: #f0f0f0 url(${imgBackGround}) no-repeat top;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button, textarea,select{
    font:400 irem "Roboto", sans-serif;
  }

  #root{
      max-width: 960px;
      margin: 0 auto;
      padding: 2.5rem 1.25rem;
  }

  bottom{
      cursor: pointer;
  }
  a{
      color: inherit;
      text-decoration: none;
  }
`;
