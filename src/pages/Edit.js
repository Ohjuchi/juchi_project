import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id : ", id);

  const mode = searchParams.get("mode");
  console.log("mode : ", mode);

  return (
    <div>
      <h1>Edit</h1>
      <p> 여기 수정 화면</p>
      <button onClick={() => setSearchParams({ who: "juchiLood" })}>
        QS 바꿔바
      </button>

      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        홈으로 가는버튼
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
