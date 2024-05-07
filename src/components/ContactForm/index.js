import PropTypes from "prop-types";
import { useState, useRef, useCallback } from "react";
import { ButtonContainer, Form } from "./styles";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

export default function ContactForm({ buttonLabel }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [categoria, setCategoria] = useState("");
  const [errors, setErrors] = useState([]);

  function handleNameChange(event) {
    setNome(event.target.value);

    if (!event.target.value) {
      setErrors((prevState) => [
        ...prevState,
        { field: "nome", message: "Nome é obrigatório." },
      ]);
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== "nome"));
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value) {

    } else {
      setEmail((prevState) => prevState.filter((error) => error.field !== "email"));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      nome, telefone, email, categoria,
    });
  }

  return (
    <Form onSubmit={useCallback(handleSubmit)}>
      <FormGroup>
        <Input
          placeholder="Nome"
          value={nome}
          onChange={useCallback(handleNameChange)}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="E-mail"
          value={email}
          onChange={useCallback(handleEmailChange)}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={telefone}
          onChange={(event) => setTelefone(event.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
        >
          <option value="" disabled>Categoria</option>
          <option value="Instagram">Instagram</option>
          <option value="Discord">Discord</option>

        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>

    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
