import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id='notification'></div>
        <div id='accountSettings'></div>
      </body>
    </Html>
  );
}
