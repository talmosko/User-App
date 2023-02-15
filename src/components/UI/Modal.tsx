import { MouseEventHandler, ReactElement } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

type BackdropProps = {
  onClose: MouseEventHandler<HTMLDivElement>;
};

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

type ModalOverlayProps = {
  children: React.ReactNode;
};

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement: HTMLElement = document.getElementById("overlays")!;

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
