/* eslint-disable no-nested-ternary */
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  useEffect, useState, useMemo, useCallback,
} from "react";
import TasksServices from "../../services/TasksServices";
import formatDate from "../../utils/formatDate";
import {
  Container, InputSearchContainer, Header, ListHeader, Card, ErrorContainer, EmptyListContainer,
  Info, TaskDescription, TaskName, Actions, TaskDate,
} from "./styles";
import Modal from "../../components/Modal";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import sad from "../../assets/images/sad.svg";
import emptyBox from "../../assets/images/empty-box.svg";

import Loader from "../../components/Loader";
import Button from "../../components/Button";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [orderBy, setOrderBy] = useState("ASC");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const filteredTasks = useMemo(() => tasks.filter((task) => (
    task.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  )), [tasks, searchTerm]);

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const tasksList = await TasksServices.listTasks(orderBy);
      setHasError(false);
      setTasks(tasksList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "ASC" ? "DESC" : "ASC"));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadTasks();
  }

  function handleToggleDelete(task) {
    setSelectedTask(task);
    setIsModalOpen(true);
  }

  function handleModalClose(refresh = false) {
    setIsModalOpen(false);
    setSelectedTask(null);
    if (refresh) {
      loadTasks();
    }
  }

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (

    <Container>
      <Loader isLoading={isLoading} />

      {isModalOpen && selectedTask && (
        <Modal
          id={selectedTask.id}
          danger
          titulo={selectedTask.titulo}
          descricao={selectedTask.descricao}
          status={selectedTask.status}
          onClose={() => handleModalClose(true)}
        />
      )}

      {(tasks.length > 0) && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar tarefa..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
          (hasError
            ? "flex-end"
            : (
              tasks.length > 0
                ? "space-between"
                : "center"
            ))
        }
      >
        {(!hasError && tasks.length > 0) && (
          <strong>
            {filteredTasks.length}
            {" "}
            {filteredTasks.length === 1 ? "Tarefa" : "Tarefas"}
          </strong>
        )}
        {!hasError && <Link to="/new">Nova Tarefa</Link>}
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Imagem de erro." />
          <div className="details">
            <strong>Ocorreu um erro ao obter suas tarefas!</strong>
            <Button type="button" onClick={() => handleTryAgain()}>
              Tente novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(tasks.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />
              <p>
                Você ainda não tem nenhuma tarefa cadastrada!
                Clique no botão
                {" "}
                <strong>”Nova tarefa"</strong>
                {" "}
                à cima para cadastrar a sua primeira!
              </p>
            </EmptyListContainer>
          )}

          {filteredTasks.length > 0 && (
            <ListHeader orderBy={orderBy}>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Título</span>
                <img src={arrow} alt="arrow icon" />
              </button>
            </ListHeader>
          )}

          {filteredTasks.map((task) => (
            <Card key={task.id}>
              <Info>
                <TaskName>
                  <strong>{task.titulo}</strong>
                  <small>{(task.status).charAt(0).toUpperCase() + task.status.slice(1)}</small>
                </TaskName>
                <TaskDescription>{task.descricao}</TaskDescription>
                <TaskDate>
                  Data criação:
                  {formatDate(task.data)}
                </TaskDate>
              </Info>

              <Actions>
                <Link to={`/edit/${task.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleToggleDelete(task)}
                >
                  <img src={trash} alt="Delete" />
                </button>
              </Actions>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
