import React, { use, useEffect, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
// import "APlayer/dist/APlayer.min.css";

const ReactAplayerComponent = ({ audio = {} }) => {
  // const [options, setOptions] = useState({
  //   audio: [audio]
  // });
  const [playerInstance, setPlayerInstance] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  // console.log(props);

  // 播放器配置参数
  const options = {
    audio: [],
    // fixed: true,
    // mini: true,
    autoplay: false,
    preload: "none"
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (playerInstance) {
        playerInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    console.log(audio, playerInstance);
    if (playerInstance) playerInstance.list.add(audio);
  }, [audio]);

  const handleInit = (ap) => {
    setPlayerInstance(ap);
    console.log("APlayer 初始化", ap);
  };

  return (
    <BrowserOnly>
      {() => {
        if (!isMounted) return null;
        const ReactAplayer = require("react-aplayer").default;
        console.log(options);
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

export default ReactAplayerComponent;
