import classNames from "classnames";
import React, {
  ProfilerProps,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";

const Frame: React.FC<
  PropsWithChildren<{
    open?: boolean;
    onClose: () => void;
    closeOnClickOutside?: boolean;
    closeOnEsc?: boolean;
  }>
> = ({
  children,
  open = true,
  onClose,
  closeOnClickOutside = true,
  closeOnEsc = true,
}) => {
  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (closeOnEsc && open && e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyPress);
    return () => window.removeEventListener("keydown", onKeyPress);
  }, [closeOnEsc, onClose, open]);

  const container = useRef<HTMLDivElement>(null);
  const onOverlayClick = (e: React.MouseEvent) => {
    if (!container.current?.contains(e.target as Node)) onClose();
  };

  return (
    <div
      className={classNames(
        "fixed inset-0 z-10 text-white bg-blurBg backdrop-blur-lg",
        `${open ? "block" : "hidden"}` // control visibility via `open` attribute (or render conditionally)
      )}
      onClick={closeOnClickOutside ? onOverlayClick : undefined}
    >
      <div
        className="relative w-[45%] h-[50%] mx-auto mt-[230px] bg-white rounded-3xl"
        ref={container}
      >
        <button
          className="absolute top-2 right-2 flex justify-center rounded-full h-8 w-8 bg-gray-600 cursor-pointer shadow-xl text-primaryDark bg-white hover:text-primary "
          onClick={() => onClose()}
        >
          <span className="text-2xl leading-7 select-none">&times;</span>
        </button>
        {/* contents */}
        <div className="overflow-hidden bg-gray-800 rounded">{children}</div>
      </div>
    </div>
  );
};

const Head: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="block px-4 bg-gray-900 shadow-xl py-8">
    <h1 className="text-lg ">{children}</h1>
  </div>
);

const Body: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const Modal = { Frame, Head, Body };
