import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();

  console.log("요게 아이디여 : ", id);

  return (
    <div>
      <h1>Diary</h1>
      <p> 여기 상세 화면임</p>
    </div>
  );
};

export default Diary;
