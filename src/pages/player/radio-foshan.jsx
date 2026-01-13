import React, { memo } from "react";
import Layout from "@theme/Layout";
import RadioFoshan from "@site/src/base-ui/player/radio-foshan";

const RadioFoshanHome = memo(() => {
  return (
    <Layout title="佛山电台" description="佛山电台">
      <RadioFoshan />
    </Layout>
  );
});

export default RadioFoshanHome;
