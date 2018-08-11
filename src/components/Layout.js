import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  html, body, #root {
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: sans-serif;
  }
  main {
    display: flex;
    flex-wrap: wrap
  }
`
const Layout = styled.div`
    min-height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;
`

export default Layout;