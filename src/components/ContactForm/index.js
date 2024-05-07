import PropTypes from "prop-types";
import { useState, useRef, useCallback } from "react";
import isEmailValid from "../../utils/isEmailValid";
import useErrors from "../../hooks/useErrors";

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

  const { setError, getErrorMessageByFieldName, removeError } = useErrors();

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleNameChange(event) {
    setNome(event.target.value);

    if (!event.target.value) {
      setError({ field: "nome", message: "Nome é obrigatório." });
    } else {
      removeError("nome");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: "email", message: "E-mail inválido." });
    } else {
      removeError("email");
    }
  }

  return (
    <Form onSubmit={useCallback(handleSubmit)}>
      <FormGroup error={useCallback(getErrorMessageByFieldName("nome"))}>
        <Input
          error={useCallback(getErrorMessageByFieldName("nome"))}
          placeholder="Nome"
          value={nome}
          onChange={useCallback(handleNameChange)}
        />
      </FormGroup>

      <FormGroup error={useCallback(getErrorMessageByFieldName("email"))}>
        <Input
          error={useCallback(getErrorMessageByFieldName("email"))}
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
