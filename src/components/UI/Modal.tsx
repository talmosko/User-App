import { MouseEventHandler, ReactElement } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import classes from "./Modal.module.css";

type BackdropProps = {
  onClose: MouseEventHandler<HTMLDivElement>;
};

const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

type ModalOverlayProps = {
  children: React.ReactNode;
  onClose: (e: React.MouseEvent) => void;
};

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <div className={classes.modal}>
      {props.children}
      <div className="form-actions">
        <Button button={{ onClick: props.onClose }}>Close</Button>
      </div>
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
        <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
