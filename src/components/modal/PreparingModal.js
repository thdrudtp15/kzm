import "./PreparingModal.scss";
import closeIcon from "../../assets/images/close.svg";

const PreparingModal = ({ mMainMenu, preparingModal, setPreparingModal }) => {
  const handleCloseModal = () => {
    setPreparingModal((prev) => {
      // 전체 모드일때 preparing ok or x click하면 overflow=""
      if (window.innerWidth > 1480) {
        document.body.style.overflow = "";
        return !prev;
      }
      if (!mMainMenu.className.includes("active")) {
        document.body.style.overflow = "";
        return !prev;
      }
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

export default PreparingModal;
