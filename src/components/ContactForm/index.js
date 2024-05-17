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

  const handlePhoneChange = useCallback((event) => {
    setTelefone(formatPhone(event.target.value));
  }, [setTelefone]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    console.log({
      nome, email, telefone: telefone.replace(/\D/g, ""), categoria,
    });
  }, [nome, email, telefone, categoria]);

  const handleNameChange = useCallback((event) => {
    setNome(event.target.value);

    if (!event.target.value) {
      setError({ field: "nome", message: "Nome é obrigatório." });
    } else {
      removeError("nome");
    }
  }, [setError, removeError]);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: "email", message: "E-mail inválido." });
    } else {
      removeError("email");
    }
  }, [setEmail, setError, removeError]);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName("nome")}>
        <Input
          error={getErrorMessageByFieldName("nome")}
          placeholder="Nome *"
          value={nome}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName("email")}>
        <Input
          type="email"
          error={getErrorMessageByFieldName("email")}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          maxLength="15"
          placeholder="Telefone"
          value={telefone}
          onChange={handlePhoneChange}
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
