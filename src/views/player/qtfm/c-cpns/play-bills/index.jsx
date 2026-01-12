import React, { memo, useState, useEffect, use } from "react";
import styles from "./styles.module.css";

const PlayBills = memo(({ bills }) => {
  const nowDay = new Date().getDay() + 1;
  const [weekid, setWeekid] = useState(nowDay);
  const [day, setDay] = useState(0);
  const changeWeek = (num) => {
    setWeekid(nowDay + num);
    setDay(num);
  };
  return (
    <div>
      <div className={styles.programs}>
        <div className={styles.header}>
          <h3 className={styles.title}>PlayBills, 电台节目表</h3>
          {bills?.album && (
            <div>
              <h4> {bills.album?.title}</h4>
              <div className={styles.description}>{bills.album?.description}</div>
              <div>
                当前播放节目：{bills.album?.nowplaying?.title}
                <span style={{ marginLeft: 1 + "em" }}>
                  {bills.album?.nowplaying?.start_time.substring(0, 5)} -{" "}
                  {bills.album?.nowplaying?.end_time.substring(0, 5)}
                </span>
              </div>
              <div>主播：{bills.album?.nowplaying?.broadcasters[0]?.username}</div>
            </div>
          )}
        </div>
        <div className={styles.tableTitle}>
          <div className={`${styles.col1} ${day === -1 ? styles.active : ""}`} onClick={() => changeWeek(-1)}>
            昨天
          </div>
          <div className={`${styles.col2} ${day === 0 ? styles.active : ""}`} onClick={() => changeWeek(0)}>
            今天
          </div>
          <div className={`${styles.col3} ${day === 1 ? styles.active : ""}`} onClick={() => changeWeek(1)}>
            明天
          </div>
        </div>
        <ul className={styles.programList}>
          {bills &&
            weekid &&
            bills.pList[weekid].map((bill) => {
              return (
                <li className={styles.radio} key={bill.id}>
                  <span className={styles.col1}>
                    {/* <div class="">
                    <button class="sprite sprite-list-play"></button>
                    <button class="sprite sprite-list-play-hover"></button>
                  </div> */}
                    <i>{bill.title}</i>
                  </span>
                  <span className={styles.col2}>
                    {bill.start_time.substring(0, 5)} - {bill.end_time.substring(0, 5)}
                  </span>
                  <span className={styles.col3}>主播：{bill.broadcasters[0]?.username}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
});

export default PlayBills;
