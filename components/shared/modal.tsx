import {
  useCallback,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import FocusTrap from 'focus-trap-react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import useWindowSize from '@/lib/hooks/use-window-size';

import Leaflet from './leaflet';

interface Props {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({
  children,
  showModal,
  setShowModal,
}) => {
  const desktopModalRef = useRef(null);

  const disableScrolling = () => {
    document.getElementsByTagName("body")[0].classList.add("modalOpen");
  };

  const enableScrolling = () => {
    document.getElementsByTagName("body")[0].classList.remove("modalOpen");
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    },
    [setShowModal],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    if (!showModal) {
      enableScrolling();
    } else {
      disableScrolling();
    }
  }, [showModal]);

  const { isMobile, isDesktop } = useWindowSize();

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {isMobile && <Leaflet setShow={setShowModal}>{children}</Leaflet>}
          {isDesktop && (
            <>
              <motion.div
                ref={desktopModalRef}
                key="desktop-modal"
                className="fixed inset-0 z-40 hidden min-h-screen items-center justify-center md:flex"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onMouseDown={(e) => {
                  if (desktopModalRef.current === e.target) {
                    setShowModal(false);
                  }
                }}
              >
                {children}
              </motion.div>
              <motion.div
                key="desktop-backdrop"
                className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
              />
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
