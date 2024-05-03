import PropTypes from "prop-types";
import { Container } from "./styles";

import Input from "../Input";

export default function FormGroup({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
