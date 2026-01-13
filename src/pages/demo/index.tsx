import React, { memo } from "react";
import Layout from "@theme/Layout";
// import PlayerHome from "@site/src/views/player/";
import styles from "./styles.module.css";

const index = memo(() => {
  return (
    <Layout title="demo" description="demo演示" >
      <div className={styles.demo}>
        <h3 className={"title"}>demo标题</h3>
        <div>
          demo演示，尝试css module样式
        </div>
      </div>
    </Layout>
  );
});

export default index;