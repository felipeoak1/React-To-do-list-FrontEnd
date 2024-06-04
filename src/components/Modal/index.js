import React from "react";
import ReactDOM from "react-dom";
import TasksServices from "../../services/TasksServices";
import { Container, Overlay, Footer } from "./styles";
import Button from "../Button";

function Modal({
  id, titulo, descricao, status, onClose, danger,
}) {
  const handleDelete = async () => {
    try {
      await TasksServices.deleteTask(id);
      onClose(true); // Passa true para indicar que a lista deve ser atualizada
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
      onClose(false); // Passa false para indicar que a lista não deve ser atualizada
    }
  };

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Tem certeza que você desejar apagar essa tarefa?</h1>
        <p>{titulo}</p>
        <Footer>
          <button type="button" className="cancel-button" onClick={() => onClose(false)}>
            Cancelar
          </button>
          <Button type="Button" onClick={handleDelete} danger={danger}>
            Confirmar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById("modal-root"),
  );
}

export default Modal;
