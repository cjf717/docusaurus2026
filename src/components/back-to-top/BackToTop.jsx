import React, { memo } from "react";
import useScrollPosition from "@site/src/hooks/useScrollPosition";
import styles from "./styles.module.css";

const BackToTop = memo(() => {
  const [_, scrollY] = useScrollPosition();
  const handleToBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      {scrollY > 500 && (
        <div className={styles.container} title="返回顶部" onClick={handleToBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
            />
          </svg>
          <div>顶部</div>
        </div>
      )}
    </div>
  );
});

export default BackToTop;
