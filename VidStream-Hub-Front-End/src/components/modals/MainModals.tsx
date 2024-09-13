"use client";
import { TypeOfMainModal, TypeOfState } from "@/Types";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";

const MainModals = ({ modalOpen, setModalOpen, children }: TypeOfMainModal) => {
  const cancelButtonRef: TypeOfState = useRef();
  return (
    <Transition show={modalOpen} as={Fragment} appear>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto text-center"
        initialFocus={cancelButtonRef}
        onClose={() => setModalOpen(false)}
      >
        <div className="min-h-screen px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-60 -z-10" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {children}
          </Transition.Child>

          <div className="absolute right-5 top-5 z-40">
            <button
              onClick={() => setModalOpen(false)}
              type="button"
              className="w-9 h-9 transitions px-[10px] py-2 text-base text-subMain bg-white rounded-full hover:bg-subMain font-bold hover:text-white "
            >
              <IoClose />
            </button>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MainModals;
