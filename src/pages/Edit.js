import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  //id로 가져온 데이터를 스테이트로 넣어서 사용할려고 만듬
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `일기장 수정 - ${id}번째 일기 수정`;
  }, []);

  console.log("확인 ID:", id);
  console.log("diaryList 확인 : ", diaryList);

  // 마운트 되었을 때 diary 리스트가 1개라도 있으면
  //diaryList에서 id가 일치하는 것을 찾아서 targetDiary에 넣는다
  // diaryList.find << 요게 골라서넣어줌
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      console.log(targetDiary);

      //targetDiary 가없을때 그러니까 해당 id가없을때
      // 수정페이지 접근을 못하게 하려고만듬 있으면 오리진에 넣는다
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
