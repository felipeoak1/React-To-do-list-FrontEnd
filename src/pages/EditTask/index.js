import TaskForm from "../../components/TaskForm";
import PageHeader from "../../components/PageHeader";

export default function Home() {
  return (
    <>
      <PageHeader title="Editar Tarefa" />
      <TaskForm buttonLabel="Salvar Alterações" />
    </>
  );
}
