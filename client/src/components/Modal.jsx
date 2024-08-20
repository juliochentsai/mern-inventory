import Wrapper from "../assets/wrappers/Modal";

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <Wrapper>
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={onClose}>
            &times;
          </span>

          <img src={content} className="modal-image" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Modal;
