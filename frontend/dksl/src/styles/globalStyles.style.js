import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

#root {
  width: 100%;
  height: 100vh;
}

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 600;
  font-family: inherit;
  color: #ffffff;
  background-color: #0BC4E2;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: white;
}
button:focus,
button:focus-visible {
  outline: 4px auto #0FA0B8;
}

a {
  text-decoration: none;
  color: black;
  transition: all .2s;
}

a:link { color: black; }
a:visited { color: black; }

input:focus {
  outline: none;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #f5f5f5;
  }
  a:hover {
    color: #747bff;
  }
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

`

export default GlobalStyles;