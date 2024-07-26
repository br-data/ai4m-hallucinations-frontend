import { createGlobalStyle } from 'styled-components';
import { mobile, big } from './variables';

export const GlobalStyle = createGlobalStyle`
  html {
    margin: 0;
  }

  body {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    font-family: 'Helvetica neue';
    font-size: 14px;
    background-color: #F1ECE8;
    
    .ant-popover {
      max-width: 400px;
    }

    @media ${big} {
      font-size: 16px;
    }

    @media ${mobile} {
      font-size: 14px;
    }
  }
`;
