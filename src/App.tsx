import { useContext, useState } from "react";
import "./App.css";
import Modal from "./components/UI/Modal";
import User from "./components/User/User";
import Users from "./components/User/Users";
import AppContext from "./store/app-context";
function App() {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const appProvider = useContext(AppContext);

  return (
    <>
      {appProvider.modalMessage && (
        <Modal onClose={appProvider.closeModal}>
          {appProvider.modalMessage}
        </Modal>
      )}
      <main>
        <Users />
      </main>
    </>
  );
}

export default App;
