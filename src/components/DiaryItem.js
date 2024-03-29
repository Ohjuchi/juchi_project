import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import React from "react";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div onClick={goEdit} className="btn_wrapper">
        <MyButton text={"수정하기"} />
      </div>
    </div>
  );
};
//위에 리턴이 너무기니까 아래에 리엑트메모 적용시킬거임
//여기 최적하는 이유 : 이미지가 포함되어있어서 리렌더링되면 대단히 위험
// 컨트롤 메뉴(리스트순서정하는 셀렉트박스)를 선택해도 이거 리랜더링 안되도되는데 되어버려서

export default React.memo(DiaryItem);
