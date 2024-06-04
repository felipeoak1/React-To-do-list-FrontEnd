import PropTypes from "prop-types";
import { useState, useCallback, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import useErrors from "../../hooks/useErrors";
import TasksService from "../../services/TasksServices";

import { ButtonContainer, Form } from "./styles";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import Loader from "../Loader";

export default function TaskForm({ buttonLabel }) {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState(id);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = titulo && status && errors.length === 0;
  const history = useHistory();

  const handleDescriptionChange = (event) => {
    setDescricao(event.target.value);

    if (event.target.value.length > 40) {
      setError({ field: "descricao", message: "Descrição só pode ter no máximo 40 caracteres." });
    } else {
      removeError("descricao");
    }
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      if (taskId) {
        await TasksService.updateTask(taskId, { titulo, descricao, status });
      } else {
        await TasksService.createTask({ titulo, descricao, status });
      }

      history.push("/");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [taskId, setError, titulo, descricao, status, history]);

  const handleTitleChange = useCallback((event) => {
    setTitulo(event.target.value);

    if (!event.target.value) {
      setError({ field: "titulo", message: "Título é obrigatório." });
    } else if (event.target.value.length > 20) {
      setError({ field: "titulo", message: "Título só pode ter no máximo 20 caracteres." });
    } else {
      removeError("titulo");
    }
  }, [setError, removeError]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);

    if (!event.target.value) {
      setError({ field: "status", message: "Status inválido" });
    } else {
      removeError("status");
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Loader isLoading={isLoading} />
      <FormGroup error={getErrorMessageByFieldName("titulo")}>
        <Input
          error={getErrorMessageByFieldName("titulo")}
          placeholder="Título *"
          value={titulo}
          onChange={handleTitleChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName("descricao")}>
        <Input
          type="text"
          error={getErrorMessageByFieldName("descricao")}
          placeholder="Descrição"
          value={descricao}
          onChange={handleDescriptionChange}
          maxLength={200}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={status}
          onChange={handleStatusChange}
          required
        >
          <option value="" disabled>
            Status da Tarefa
          </option>
          <option value="Pendente">Pendente</option>
          <option value="Em progresso">Em progresso</option>
          <option value="Concluída">Concluída</option>

        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>

    </Form>
  );
}

TaskForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
