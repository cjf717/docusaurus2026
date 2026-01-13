import React, { memo, useEffect, useState, useRef } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import csvToJson from "@site/src/utils/csvToJson";
import APlayerWrapper from "@site/src/components/aplayer/APlayerWrapper";
import Dialog from "@site/src/components/dialog";

import styles from "./styles.module.css";

const RadioFoshan = memo(() => {
  const url = useBaseUrl("csv/radiofoshan.csv");
  const [audioObj, setAudioObj] = useState();
  const [data, setData] = useState([]);
  const apInstance = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    csvToJson(url).then((res) => {
      setData(res);
      // const myAudio = {
      //   url: res[0]["播放地址"],
      //   name: res[0]["电台"].slice(4),
      //   artist: "佛山电台",
      //   // cover: "/img/logo.svg"
      //   cover: require(`@site/static/img/cover/${res[0]["封面图片"]}`).default,
      //   type: "customHls"
      // };
      // setAudioObj(myAudio);
      const audioList = res.map((item) => {
        return {
          url: item["播放地址"],
          name: item["电台"].slice(4),
          artist: "佛山电台",
          // cover: "/img/logo.svg"
          cover: require(`@site/static/img/cover/${item["封面图片"]}`).default,
          type: "customHls"
        };
      });
      apInstance.current.list.add(audioList[0]);
    });
  }, []);
  const playAudio = (obj) => {
    const myAudio = {
      url: obj["播放地址"],
      name: obj["电台"].slice(4),
      artist: "佛山电台",
      // cover: "/img/logo.svg"
      cover: require(`@site/static/img/cover/${obj["封面图片"]}`).default,
      type: "customHls"
    };
    if (apInstance?.current) {
      apInstance.current.list.add(myAudio);
      apInstance.current.list.switch(apInstance.current.list.audios.length - 1);
      apInstance.current.play();
    }
  };

  function getPlayList(url) {
    console.log(url);
  }

  return (
    <div>
      <div className={styles.flex}>
        <h3>佛山电台APlayerWrapper</h3>
        <a href={useBaseUrl("player/qtfm")}>蜻蜓FM</a>
      </div>
      <APlayerWrapper apInstance={apInstance} />
      <div className={styles.list}>
        {data.map((item, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.album}>
              <img
                className={styles.cover}
                src={require(`@site/static/img/cover/${item["封面图片"]}`).default}
                alt="封面"
              />
            </div>
            <div className={styles.content}>
              <h4>{item["电台"]}</h4>
              <div>播放地址：...{item["播放地址"].slice(-12)}</div>
              <div>
                网页地址：
                <a href={item["网页地址"]} target="_blank" rel="noopener noreferrer">
                  ...{item["网页地址"].slice(-12)} 打开网站
                </a>
              </div>
              <div>
                节目表：
                <a href={item["节目表"]} target="_blank" rel="noopener noreferrer">
                  ...{item["节目表"].slice(-11)} 打开网站
                </a>
                {/* <iframe src={item["节目表"]} width="100%" height="300" frameBorder="0" allowFullScreen></iframe> */}
                <div className={styles.flex}>
                  <button onClick={() => getPlayList(item["节目表"])}>获取信息</button>
                  <button onClick={() => playAudio(item)}>播放节目</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog ref={dialogRef} />
      <button onClick={() => dialogRef.current.showModal()}>Open dialog</button>
      <output></output>
    </div>
  );
});

export default RadioFoshan;
