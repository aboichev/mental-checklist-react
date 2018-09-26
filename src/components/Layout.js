import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  html, body, #root {
    margin: 0;    
  }
  @media screen and (orientation: landscape) {
    #board { 
      width: 48vw;
      height: 48;
      float: left;
    }
  }
  @media screen and (orientation: portrait) {
      #board { 
        width: 100vw;
        height: 100vw;
        margin:0;
        padding:0;
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
  }
  header {
    background-color: #f0d9b5;  
  }
  header > button {
    float: right;
  }
  main {
    background-color: #f0d9b566;
  }
`

export default Layout;