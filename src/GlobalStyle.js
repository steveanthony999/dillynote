import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
    --color-primary-dark: #006d77;
    --color-primary-light: #83C5BE;
    --color-secondary-dark: #E29578;
    --color-secondary-light: #FFDDD2;
    --color-midtone: #EDF6F9;
    --color-white: #fff;
    --color-black: #000;
    --container-width: 1100px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: var(--color-midtone);
    font-family: Arial, Helvetica, sans-serif
}
`;

export default GlobalStyle;
