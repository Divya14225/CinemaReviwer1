import { Form, Button } from 'react-bootstrap';

const ReviewForm = ({ handleSubmit, revText, flag, labelText, defaultValue }) => {
  return (
<Form>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>{labelText}</Form.Label>
    <Form.Control 
      ref={revText} 
      as="textarea" 
      rows={3} 
      defaultValue={defaultValue} 
      disabled={flag === "false"} // Adjust based on flag string
    />
  </Form.Group>
  {flag === "true" && (
    <Button variant="outline-info" onClick={handleSubmit}>Submit</Button>
  )}
</Form>

  );
};

export default ReviewForm;
