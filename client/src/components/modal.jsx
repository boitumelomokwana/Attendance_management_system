import "../styles/modal.css";

function Modal({ isOpen, onClose, children }) {

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✖
                </button>

                {children}

            </div>

        </div>

    );

}

export default Modal;