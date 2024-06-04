export default function formatDate(dateApi) {
  const data = new Date(dateApi);

  const dia = data.getDate();
  const mes = data.getMonth() + 1; // Lembrando que os meses são base zero, então adicionamos 1
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}
