const MyButton = ({ text, type, onClick }) => {
  //이건 만약 다른타입의 클래스이름으로 온 버튼이면 강제적으로 defult로 바꿔버림
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      className={["MyButton", `MyButton_${type}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
