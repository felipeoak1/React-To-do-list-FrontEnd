import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import formatPhone from "../../utils/formatPhone";
import {
  Container, InputSearchContainer, Header, ListHeader, Card,
} from "./styles";

import Loader from "../../components/Loader";
import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("ASC");

  useEffect(() => {
    fetch(`http://localhost:3001/contacts?order=${orderBy}`)
      .then(async (response) => {
        const resposta = await response.json();
        setContacts(resposta);
      })
      .catch((response) => console.log(response));
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "ASC" ? "DESC" : "ASC"));
  }

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {" "}
          {contacts.length === 1 ? "contato" : "contatos"}
        </strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      <ListHeader>
        <button type="button" onClick={handleToggleOrderBy}>
          <span>Nome</span>
          <img src={arrow} alt="arrow icon" />
        </button>
      </ListHeader>

      {contacts.map((contact) => (
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
