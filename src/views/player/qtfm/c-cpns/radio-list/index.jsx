import React, { memo, useEffect, useState,useRef } from "react";

import styles from "./styles.module.css";

const RadioList = memo(({ radios, getPlayBills, playRadio }) => {
  const [area, setArea] = useState();
  const [areaList, setAreaList] = useState([]);
  const [city, setCity] = useState();
  const [cityList, setCityList] = useState([]);
  const [genre, setGenre] = useState();
  const [genreList, setGenreList] = useState([]);
  
  useEffect(() => {
    const areaArr = [];
    const cityArr = [];
    const genreArr = [];
    radios.forEach((item) => {
      if (!areaArr.includes(item["地理位置"])) {
        areaArr.push(item["地理位置"]);
      }
      if (!cityArr.includes(item["城市"])) {
        cityArr.push(item["城市"]);
      }
      if (!genreArr.includes(item["类型"])) {
        genreArr.push(item["类型"]);
      }
    });
    setAreaList(areaArr);
    setCityList(cityArr);
    setGenreList(genreArr);
  }, [radios]);
  const handleArea = (e) => {
    setArea(e.target.value);
    const cityArr = [];
    radios.forEach((item) => {
      if (!cityArr.includes(item["城市"]) && item["地理位置"] === e.target.value) {
        cityArr.push(item["城市"]);
      }
    });
    setCityList(cityArr);
  };

  const handleCity = (e) => {
    if (!area) {
      const radio = radios.find((item) => item["城市"] === e.target.value);
      setArea(radio["地理位置"]);
      const cityArr = [];
      radios.forEach((item) => {
        if (!cityArr.includes(item["城市"]) && item["地理位置"] === radio["地理位置"]) {
          cityArr.push(item["城市"]);
        }
      });
      setCityList(cityArr);
    }
    setCity(e.target.value);
  };

  const handleGenre = (e) => {
    setGenre(e.target.value);
    setArea();
    setCity();
  };

  return (
    <div className={styles.list}>
      <div className={styles.flex}>
        <div>
          <label htmlFor="area-select">
            <select id="area-select" value={area} onChange={handleArea}>
              <option value="">--地理位置--</option>
              {areaList?.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="city-select">
            <select id="city-select" value={city} onChange={handleCity}>
              <option value="">--城市归属--</option>
              {cityList?.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="genre-select">
            <select id="genre-select" value={genre} onChange={handleGenre}>
              <option value="">--类型--</option>
              {genreList?.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {radios
        .filter((item) => {
          if (genre) return item["类型"] === genre;
          if (!area) return true;
          if (!city) return item["地理位置"] === area;
          return item["地理位置"] === area && item["城市"] === city;
        })
        .map((item, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.album}>
              <img className={styles.cover} src={item["imgUrl"]} alt="封面" />
            </div>
            <div className={styles.content}>
              <h4>{item["电台"]}</h4>
              <div>播放id：{item["id"]}</div>
              <div>
                原网站：
                <a href={`https://www.qtfm.cn/radios/${item["id"]}/`} target="_blank" rel="noopener noreferrer">
                  电脑版
                </a>
                <a href={`https://m.qtfm.cn/channels/${item["id"]}/`} target="_blank" rel="noopener noreferrer">
                  手机版
                </a>
              </div>
              <div>
                地理位置：{item["地理位置"]}
                {item["城市"]}，类型：{item["类型"]}
              </div>
              <div className={styles.flex}>
                <button onClick={() => getPlayBills(item)}>获取节目表</button>
                <button onClick={() => playRadio(item)}>播放</button>
              </div>
            </div>
          </div>
        ))}
        
    </div>
  );
});

export default RadioList;
