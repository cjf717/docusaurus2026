import React, { useEffect, useRef, useState, useCallback } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import PropTypes from "prop-types";
import "aplayer/dist/APlayer.min.css";
// import styles from "./styles.module.css";
import Hls from "hls.js";

const APlayerWrapper = ({ apInstance }) => {
  // 添加参数默认值
  const playerRef = useRef(null);
  // const apInstance = useRef(null);
  const containerRef = useRef(null);
  // const [audios, setAudios] = useState([]);

  // 新增容器挂载状态
  const [containerReady, setContainerReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && containerReady) {
      const APlayer = require("aplayer");

      // 确保容器元素存在
      if (!containerRef.current) {
        console.error("播放器容器未找到");
        return;
      }

      if (apInstance.current) {
        apInstance.current.destroy();
      }

      // 创建新实例时添加安全检查
      try {
        apInstance.current = new APlayer({
          container: containerRef.current,
          audio: [],
          // fixed: true,
          // mini: true,
          autoplay: false,
          preload: "none",
          loop: "none",
          listFolded: true,
          volume: 1,
          mutex: true,

          // theme: "#FF5722",
          customAudioType: {
            customHls: function (audioElement, audio, player) {
              if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(audio.url);
                hls.attachMedia(audioElement);
              } else if (
                audioElement.canPlayType("application/x-mpegURL") ||
                audioElement.canPlayType("application/vnd.apple.mpegURL")
              ) {
                audioElement.src = audio.url;
              } else {
                player.notice("Error: HLS is not supported.");
              }
            }
          }
        });
      } catch (error) {
        console.error("播放器初始化失败:", error);
      }
    }
  }, [containerReady]); // 添加容器就绪依赖

  // useEffect(() => {
  //   if (apInstance.current && audioObj) {
  //     console.log("audioObj为：", audioObj, audioObj.length);
  //     // apInstance.current.list.clear();
  //     if (audioObj.length > 0) {
  //       console.log("audioObj为数组");
  //       apInstance.current.list.add(audioObj);
  //     } else {
  //       console.log("audioObj为对象");
  //       apInstance.current.list.add([audioObj]);
  //     }
  //     // apInstance.current.list.add([...audioObj]);
  //   }
  // }, [audioObj]);
  function clearList() {
    // console.log("清空播放列表");
    apInstance.current.list.clear();
  }
  function handerPlay() {
    // console.log("播放或暂停");
    apInstance.current.toggle();
  }
  return (
    <BrowserOnly fallback={<div className="aplayer-skeleton" />}>
      {() => {
        // 新增容器渲染回调
        return (
          <div>
            <div
              ref={(el) => {
                containerRef.current = el;
                setContainerReady(!!el);
              }}
              // style={{ margin: "1rem 0", minHeight: "60px" }}
            />
            <div>
              <button onClick={clearList}>清空列表</button>
              <button onClick={handerPlay}>播放/暂停</button>
            </div>
          </div>
        );
      }}
    </BrowserOnly>
  );
};

APlayerWrapper.propTypes = {
  audio: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string,
    artist: PropTypes.string,
    cover: PropTypes.string
  }).isRequired
};

APlayerWrapper.defaultProps = {
  audio: {
    url: "/audio/demo.mp3",
    name: "默认名称",
    artist: "默认艺术家",
    cover: "/img/cover.jpg"
  }
};

export default APlayerWrapper;
