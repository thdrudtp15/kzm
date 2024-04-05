import closeIcon from "../assets/images/close.svg";
import "./PreparingModal.scss";

const PreparingModalPc = ({ preparingModal, setPreparingModal }) => {
  const handleCloseModal = () => {
    setPreparingModal((prev) => {
      document.body.style.overflow = "";
      return !prev;
    });
  };
  return (
    <>
      <div className="preparing-modal">
        <div className="preparing-box">
          <div className="preparing-box__header">
            <img src={closeIcon} alt="close" onClick={handleCloseModal} />
          </div>
          <span>Preparing</span>
          <button className="btn-ok" onClick={handleCloseModal}>
            OK
          </button>
        </div>
      </div>
    </>
  );
};

export default PreparingModalPc;
