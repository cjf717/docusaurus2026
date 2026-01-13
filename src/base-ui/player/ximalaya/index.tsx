import { memo, useEffect, useState } from "react";
import csvToJson from "@site/src/utils/csvToJson";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.scss";

const ximalaya = memo(() => {
  const url = useBaseUrl("csv/喜马拉雅/广东地区电台_喜马拉雅_aac64.csv");
  const [radios, setRadios] = useState([]);

  useEffect(() => {
    csvToJson(url)
      .then((res) => {
        console.log(res);
        setRadios(res);
        // const audios = res.map((item) => ({
        //   url: `https://lhttp.qingting.fm/live/${item["id"]}/64k.mp3`,
        //   name: item["电台"],
        //   artist: "蜻蜓FM",
        //   cover: item["imgUrl"],
        //   lrc: `[00:00.000]${item["电台"]}_${item["区域"]}_蜻蜓FM`
        //   // type: "customHls"
        // }));
        // // console.log(audios);
        // setAudio(audios);
        // if (apInstance?.current) apInstance.current.list.add(audios[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h3>喜马拉雅</h3>
      <div>
        {radios.map((item) => (
          <div className={styles.card} key={item["电台ID"]}>
            <div className={styles.album}>
              <img src={"img/cover/ximalaya/" + item["电台ID"] + ".jpg"} alt={item["电台名称"]} />
            </div>
            <div className={styles.content}>
              <div className={styles.title}>{item["电台名称"]}</div>
              <div>电台ID: {item["电台ID"]}</div>
              <div>分类名称: {item["分类名称"]}</div>
              <div>
                <a href={"https://www.ximalaya.com/radio/" + item["电台ID"]} target="_blank" rel="noopener noreferrer">
                  官方链接
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
export default ximalaya;
