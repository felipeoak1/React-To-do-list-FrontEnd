import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState, useMemo } from "react";
import ContactsService from "../../services/ContactsService";

import formatPhone from "../../utils/formatPhone";
import {
  Container, InputSearchContainer, Header, ListHeader, Card,
} from "./styles";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";

import Loader from "../../components/Loader";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("ASC");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  // useEffect não pode ser configurado como assíncrono. Race condition.
  useEffect(() => {
    async function loadContacts() {
      setIsLoading(true);
      try {
        const contactsList = await ContactsService.listContacts(orderBy);
        setContacts(contactsList);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();

    return () => console.log("Clean Up");
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "ASC" ? "DESC" : "ASC"));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  console.log("renderizou");

  return (
    <Container>

      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquisar contato..."
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {" "}
          {filteredContacts.length === 1 ? "contato" : "contatos"}
        </strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="arrow icon" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name
                && <small>{contact.category_name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{formatPhone(contact.phone)}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}

    </Container>
  );
}
