import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
    --color-primary-dark: #111;
    --color-primary-light: #777;
    --color-secondary-dark: #333;
    --color-secondary-light: #ddd;
    --color-midtone: #f3f3f3;
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
    background: var(--color-white);
    font-family: Arial, Helvetica, sans-serif
}
`;

export default GlobalStyle;
