const Toast = ({ message, type }) => {
  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 text-white rounded shadow-lg
      ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      {message}
    </div>
  );
};

export default Toast;
