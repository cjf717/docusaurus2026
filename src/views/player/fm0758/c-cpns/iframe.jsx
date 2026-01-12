import React, { memo, use, useRef,useEffect } from "react";
import styles from "./styles.module.css";

const iframe = memo(({ url }) => {
  const iframeRef = useRef(null);
  useEffect(() => {
    iframeRef.current.contentWindow.postMessage("reload", "*");
  }, []);
  useEffect(() => {
    window.addEventListener(
      "message",
      function (event) {
        if (event.data === "reload") {
          location.reload(); // 仅当事件来源正确时才执行重载
        }
      },
      false
    );
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [url]);
  return (
    <div className={styles.container}>
      <div>{url}</div>
      <iframe className={styles.iframe} src={url} title={url}></iframe>
    </div>
  );
});

export default iframe;
