import { useContext, useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/UI/Modal";
import Users from "./components/User/Users";
import DataContext from "./store/data-context";
function App() {
  const dataProvider = useContext(DataContext);
  const [modalMessage, setModalMessage] = useState<String>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    if (dataProvider.updateMessage && dataProvider.updateMessage.length > 0) {
      setModalMessage(dataProvider.updateMessage);
      setIsModalOpen(true);
    }
  }, [dataProvider.updateMessage, modalMessage]);

  return (
    <>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          {modalMessage}
        </Modal>
      )}
      <main>
        <Users />
      </main>
    </>
  );
}

export default App;
