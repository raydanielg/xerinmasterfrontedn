import React from "react";
import Head from "next/head";
const DynamicFavicon = ({ configData }) => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/logo.svg"
      />
      <link rel="icon" href="/logo.svg" />
      <link
        rel="icon"
        type="image/svg+xml"
        href="/logo.svg"
      />
    </Head>
  );
};

DynamicFavicon.propTypes = {};

export default DynamicFavicon;
