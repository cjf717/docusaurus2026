import React, { memo } from "react";
import Layout from "@theme/Layout";
import PlayerHome from "@site/src/base-ui/player";

const index = memo(() => {
  return (
    <Layout title="播放器" description="播放器,蜻蜓FM">
      <PlayerHome />
    </Layout>
  );
});

export default index;
