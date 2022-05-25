import { Form } from "solid-bootstrap";

const FormInput = ({ controlId, label, type, placeholder, onBlur, value }) => {
  return (
    <Form.Group className="mb-3" controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        onBlur={onBlur}
        value={value}
      />
    </Form.Group>
  );
};

export default FormInput;
