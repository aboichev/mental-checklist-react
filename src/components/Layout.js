import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  html, body  {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #f0d9b566;
    overscroll-behavior: contain;
  }
  @media screen and (orientation: landscape) {
    #board { 
      width: 90vh;
      height: 90vh;
      float: left;
    }
  }
  @media screen and (orientation: portrait) {
      #board { 
        width: 94vw;
        height: 94vw;
        margin: auto;
      }
  }
`
const Layout = styled.div`
  font-family: sans-serif;
  h1 {
    display: inline;
    font-size: 1.6em;
    margin: 0;
    color: #b58863;
    padding: 6px;
  }
  header {
    background-color: #f0d9b5;  
  }
  header > button {
    float: right;
  }
`

export default Layout;