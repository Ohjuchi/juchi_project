import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `일기장  - 작성`;
  }, []);
  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
