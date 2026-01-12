import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React, { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
// import BrowserOnly from "@docusaurus/BrowserOnly";
// import APlayerWrapper from "@site/src/components/aplayer/APlayerWrapper";
// import styles from "./styles.module.css";
// import PostMessage from "@site/src/components/cors/postMessage";
// import IframePage from "@site/src/components/cors/IframePage";
// import CorsIndex from "@site/src/components/cors";

function PlayerPageHome() {
  return (
    <main>
      {/* <IframePage /> */}
      <nav>相关链接
        <ul>
          <li>
            <a href={useBaseUrl("player/radio-foshan")}>佛山电台</a>
          </li>
          <li>
            <a href={useBaseUrl("player/qtfm")}>蜻蜓FM</a>
          </li>
          <li>
            <a href={"http://www.fm0758.com/fm/"}>怀集音乐之声-官方直播</a>
          </li>
        </ul>
      </nav>
      <nav>节目单
        <ul>
          <li>
            <a href={useBaseUrl("player/fm0758")}>怀集音乐之声-节目单</a>
          </li>
          <li>
            <a href={"http://103.39.226.135:8088/48.txt"}>怀集音乐之声-实时节目单</a>
          </li>
        </ul>
      </nav>
    </main>
  );
}

export default PlayerPageHome;
