import { Container, Form, Button, Row, Col } from "react-bootstrap";

export default function MessageForm({ handleSubmit, text, setText }) {
  return (
    <Form onSubmit={handleSubmit} className="justify-content-center">
      <Container className="align-items-center">
        <Row className="justify-content-center ms-auto p-2 fixed-bottom">
          <Col sm="auto" md="6" lg="4">
            <Form.Control
              required
              type="text"
              placeholder="Enter message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Col>
          <Col sm="auto" md="2" lg="2" className="text-center">
            <Button type="submit" className="btn-sign align-items-center m-1">
              Send
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}
