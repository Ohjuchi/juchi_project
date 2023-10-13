import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App.js";
import { getStringDate } from "../util/date.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/emotion.js";

// 데이트형식의 값이 들어오면 yyyy-hh-dd 형식으로 바꿔서 배출해줌 근데 문제도 있는거같고해서 새로 util로만들어서 임포트중
// const getStringDate = (date) => {
//   return date.toISOString().slice(0, 10);
// };

const DiaryEditor = ({ isEdit, originData }) => {
  //dom속성가져오려고 포커스영향주기위해
  const contentRef = useRef();
  //작성내용 데이터 상태로가져오기
  const [content, setContent] = useState("");
  //이미지 디폴트 번호및 상태가져오기
  const [emotion, setEmotion] = useState(3);
  //오늘날짜로 디폴트로 넣기
  const [date, setDate] = useState(getStringDate(new Date()));
  //네비게이트 화면이동에 필수 선언
  const navigate = useNavigate();

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  //이모션 클릭시 이모션 상태값 프롭으로 보내서 상태 변화시키는 로직..?
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  // 작성완료버튼
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새일기를 작성할래?")
    ) {
      if (!isEdit) {
        //일기작성 데이터 보내기
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    //replace true   이건 뒤로가기할떄 이쪽으로 못오게하는거
    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("일기를 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <MyButton
              text="삭제하기"
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제임?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
      </div>

      <div>
        <h4>오늘의 기모찌</h4>
        <div className="input_box emotion_list_wrapper">
          {emotionList.map((it) => (
            <EmotionItem
              key={it.emotion_id}
              {...it}
              onClick={handleClickEmote}
              isSelected={it.emotion_id === emotion}
            />
          ))}
        </div>
      </div>
      <section>
        <h4>오늘의 뻘짓</h4>
        <div className="input_box text_wrapper">
          <textarea
            placeholder="오늘의 뻘짓을 적어랏"
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </section>
      <section>
        <div className="control_box">
          <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
          <MyButton
            text={"작성완료"}
            type={"positive"}
            onClick={handleSubmit}
          />
        </div>
      </section>
      <div></div>
      <div></div>
    </div>
  );
};

export default DiaryEditor;
