import PageHeader from "../../components/PageHeader";
import ContactForm from "../../components/ContactForm";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";

export default function Home() {
  return (
    <>
      <PageHeader title="Novo Contato" />
      <ContactForm />
    </>
  );
}
