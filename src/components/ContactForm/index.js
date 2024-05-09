import PropTypes from "prop-types";
import { useState, useRef, useCallback } from "react";
import isEmailValid from "../../utils/isEmailValid";
import useErrors from "../../hooks/useErrors";
import formatPhone from "../../utils/formatPhone";

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

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (nome && errors.length === 0);

  function handlePhoneChange(event) {
    setTelefone(formatPhone(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      nome, email, telefone: telefone.replace(/\D/g, ""), categoria,
    });
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
    <Form onSubmit={useCallback(handleSubmit)} noValidate>
      <FormGroup error={useCallback(getErrorMessageByFieldName("nome"))}>
        <Input
          error={useCallback(getErrorMessageByFieldName("nome"))}
          placeholder="Nome *"
          value={nome}
          onChange={useCallback(handleNameChange)}
        />
      </FormGroup>

      <FormGroup error={useCallback(getErrorMessageByFieldName("email"))}>
        <Input
          type="email"
          error={useCallback(getErrorMessageByFieldName("email"))}
          placeholder="E-mail"
          value={email}
          onChange={useCallback(handleEmailChange)}
        />
      </FormGroup>

      <FormGroup>
        <Input
          maxLength="15"
          placeholder="Telefone"
          value={telefone}
          onChange={useCallback(handlePhoneChange)}
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
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>

    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
