import React, { useEffect, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import "APlayer/dist/APlayer.min.css";

const APlayerComponent = (props) => {
  const [playerInstance, setPlayerInstance] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [options, setOptions] = useState({});
  const [audio, setAudio] = useState({});

  useEffect(() => {
    // 播放器配置参数;
    const options = {
      audio: {
        url: "/audio/demo.mp3",
        name: "示例音乐",
        artist: "未知艺术家",
        cover: "/img/album-cover.jpg"
      },
      autoplay: false
    };
    setOptions(options);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (playerInstance) {
        playerInstance.destroy();
      }
    };
  }, []);

  const handleInit = (ap) => {
    setPlayerInstance(ap);
    console.log("APlayer initialized");
  };

  return (
    <BrowserOnly>
      {() => {
        if (!isMounted) return null;
        const ReactAplayer = require("react-aplayer").default;
        return (
          <ReactAplayer
            theme="#FF5722"
            {...options}
            onInit={handleInit}
            onPlay={() => console.log("开始播放")}
            onPause={() => console.log("暂停播放")}
          />
        );
      }}
    </BrowserOnly>
  );
};

export default APlayerComponent;
