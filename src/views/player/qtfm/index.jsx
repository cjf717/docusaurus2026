import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import csvToJson from "@site/src/utils/csvToJson";
import useBaseUrl from "@docusaurus/useBaseUrl";
import APlayerWrapper from "@site/src/components/aplayer/APlayerWrapper";
import RadioList from "./c-cpns/radio-list";
import PlayBills from "./c-cpns/play-bills";

import BackToTop from "@site/src/components/back-to-top/BackToTop";
import styles from "./styles.module.css";

const qingtingFm = memo(() => {
  const url = useBaseUrl("csv/蜻蜓FM广东区域.csv");
  const [audio, setAudio] = useState();
  const [radios, setRadios] = useState([]);
  const [bills, setBills] = useState();
  const apInstance = useRef(null);

  useEffect(() => {
    csvToJson(url)
      .then((res) => {
        // console.log(res);
        setRadios(res);
        const audios = res.map((item) => ({
          url: `https://lhttp.qingting.fm/live/${item["id"]}/64k.mp3`,
          name: item["电台"],
          artist: "蜻蜓FM",
          cover: item["imgUrl"],
          lrc: `[00:00.000]${item["电台"]}_${item["区域"]}_蜻蜓FM`
          // type: "customHls"
        }));
        // console.log(audios);
        setAudio(audios);
        if (apInstance?.current) apInstance.current.list.add(audios[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  const getPlayBills = useCallback(
    (obj) => {
      async function getBills(url) {
        await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setBills(data);
          })
          .catch((err) => console.log(err));
      }
      const url = `https://webapi.qtfm.cn/api/pc/radio/${obj.id}`;
      getBills(url);
      // if (id !== playId) setPlayId(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [bills]
  );
  const playRadio = useCallback(
    (obj) => {
      // console.log(obj.id);
      getPlayBills(obj);
      const myAudio = {
        url: `https://lhttp.qingting.fm/live/${obj.id}/64k.mp3`,
        name: obj["电台"],
        artist: "蜻蜓FM",
        cover: obj["imgUrl"],
        lrc: `[00:00.000]${obj["电台"]}_${obj["区域"]}_蜻蜓FM'`
        // type: "customHls"
      };
      if (apInstance?.current) {
        apInstance.current.list.add(myAudio);
        apInstance.current.list.switch(apInstance.current.list.audios.length - 1);
        apInstance.current.play();
      }
      // window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [audio]
  );
  return (
    <div>
      <div className={styles.flex}>
        <h3>蜻蜓FM</h3>
        <a href={useBaseUrl("player/radio-foshan")}>佛山电台</a>
      </div>
      <div>网页版：https://www.qtfm.cn/</div>
      <div>手机版：https://m.qtfm.cn/categories/5/</div>
      <APlayerWrapper apInstance={apInstance} />
      {bills && <PlayBills bills={bills} />}
      {radios && <RadioList radios={radios} getPlayBills={getPlayBills} playRadio={playRadio} />}
      <BackToTop />
    </div>
  );
});

export default qingtingFm;
