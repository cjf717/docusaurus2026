import React, { memo,useState } from 'react'
import myIframe from "./c-cpns/iframe"

const Fm0758 = memo(() => {
  const [url,setUrl] = useState("https://app.radiofoshan.com.cn//pc/index/ajaxGetBsPlayList?id=46&date=");
  const getIframe = (url) => {
    setUrl("https://app.radiofoshan.com.cn//pc/index/ajaxGetBsPlayList?id=41&date=");
  }
  return (
    <div>
      <h3>FM0758</h3>
      <div>
        <label htmlFor="url-input">
          <input id="url-input" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
        <button onClick={() => getIframe(url)}>获取节目信息</button>
      </div>
      {/* { url && <myIframe url={url}/>} */}
      {/* <Iframe url={"http://sfy.hj0758.cn:8000/ssgd/fm0758.txt"}/> */}
      {/* <myIframe url={"http://103.39.226.135:8088/48.txt"}/> */}
      {/* <Iframe url={"http://103.39.230.200:8088/ssgd.txt"}/> */}
    </div>
  )
})

export default Fm0758