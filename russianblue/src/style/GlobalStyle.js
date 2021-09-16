import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    html{
        overflow-x: hidden;
    }
    :root{
        --font-logo:'Lato', sans-serif;
        --font-text:sans-serif;
        --font-title: 'Verdana';
        --font-japanese:'Noto Sans JP', sans-serif;
        --color-orange: #E1763C;
        --color-yellow: #C9C9EE;
        --color-black: #05030B;
        --color-green: #658578;
        --color-beige: #FBD4A7;
        --color-special: #E84855;
        background-color: var(--color-beige);




        --padding-s: 10px;
        --padding-m: 50px;
        --padding-l: 90px;

        --font-size-xl: 48px;
        --font-size-l: 36px;
        --font-size-m: 24px;
        --font-size-s: 18px;
        --font-size-xs: 14px;
        --link-color: white;
        --link-hover-color: grey;
        --link-border-color: purple;
        --link-background-color: purple;
        --link-border-color2: red;
        --link-background-color2: grey;

        --spacing-s: 25px;
        --spacing-m: 55px;
        --spacing-l: 85px;

        --interactive-height: 46px;
        --interactive-height: 36px;
        --interactive-height-s: 24px;
        --search-box-width: 70vw;
        --card-border-color:black;
        --card-border-size: 1px;
        --card-border-radius: 5px;
        --card-height: 340px;
        --card-width: 240px;
        --card-textbox: 45%;
        --card-text-color: white;
        --card-text-color-secondary: grey;

        --card-textbox-background: rgba(0,0,0,0.7);

        --item-price-color: orange;

        --header-height: 60px;
        --header-content-height: 50px;
        --header-spacer: 70px;
        --header-background: var(--color-orange);
        --header-font-color: var(--color-beige);
        --header-icon-color: var(--color-beige);
        --header-username-color: var(--color-beige);


        --search-container-height: 100vh;
        --search-container-width: 100vw;
        --search-box-border-radius: 5px;

        --product-card-container-size: 250px;

        --product-slideshow-height: 30vh;
        --product-slideshow-icon-height: 30px;
        --product-slideshow-icon-color: rgba(0,0,0,0.3);
        --product-lining: black;
        --card-textbox-background: rgba(0,0,0,0.5);
        --button-background-color: #BF0000;
        --action-button-color: black;
        --action-button-background-color: orange;
        --shadow-s: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        --shadow-m: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        // #BF0000 = Rakuten Red

        --button-color: white;
        --form-width: 75vw;
        --form-textarea-height: 45vh;
        --font-family: sans-serif;

    }
`;
