import PageHeader from "../../components/PageHeader";
import TaskForm from "../../components/TaskForm";

export default function Home() {
  return (
    <>
      <PageHeader title="Nova Tarefa" />
      <TaskForm buttonLabel="Cadastrar" />
    </>
  );
}
