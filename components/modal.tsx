"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";


interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}
const Modal = ({
  isOpen,
  onClose,
  title,
  body,
  footer,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleBackgroundClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (event.target === event.currentTarget) {
        handleClose();
      }
  }, [handleClose]);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      {/* 배경 어둡게 */}
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 "
        onClick={handleBackgroundClick}
      >
        <div className=" relative w-full md:w-4/6 lg:w-3/6 xl:w-2/6 my-6 mx-auto h-full lg:h-auto md:h-auto ">
          {/*content*/}
          <div
            className={` translate duration-300 h-full
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
              {/*header*/}
              <div className=" flex items-center p-6 rounded-t justify-center relative border-b-[1px] ">
                {/* 닫기 버튼 */}
                <button
                  className="p-1 border-0 hover:opacity-70 transition absolute right-9 "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                {/* header-title */}
                <div className="text-base font-semibold">{title}</div>
              </div>
              {/*body*/}
                  {body}
              {/*footer*/}
                  {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
