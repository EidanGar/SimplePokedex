import React, { useContext } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { ReducerTypes } from "../pages";
import PokemonAppData from "../pages/PokemonContext";
import { FormControlElement } from "@types/react-bootstrap";

const Pagination = () => {
  const { page, data, dispatch } = useContext(PokemonAppData);

  const handlePages = <
    T extends
      | React.MouseEvent<HTMLButtonElement>
      | React.ChangeEvent<FormControlElement>
  >(
    e: T,
    i?: number
  ): void => {
    const elem = e as T;
    const target = elem.target;
    switch (target.id) {
      case "prev":
        if (page !== 1) {
          dispatch({ type: ReducerTypes.SET_PAGE, payload: page - 1 });
        }
        break;
      case "next":
        if (page !== Math.ceil(data.length / 20)) {
          dispatch({ type: ReducerTypes.SET_PAGE, payload: page + 1 });
        }
        break;
      case "input":
        if (page === i) return;
        if (i && i <= Math.ceil(data.length / 20) && i > 0) {
          dispatch({ type: ReducerTypes.SET_PAGE, payload: i });
        }
        break;
      default:
        throw new Error(`${target.id} is not a valid id for HandlePages.`);
    }
  };

  return (
    <Row className="justify-content-between w-75 mt-auto">
      <Col xs="auto">
        <Button variant="primary" id="prev" onClick={handlePages}>
          Previous
        </Button>
      </Col>
      <Col>
        <Form.Control
          max={Math.ceil(data.length / 20)}
          min={0}
          id="input"
          onChange={(e) => handlePages(e, +e.target.value)}
          type="number"
          className="w-25 mx-auto"
          autoComplete="off"
        />
      </Col>
      <Col xs="auto">
        <Button variant="primary" id="next" onClick={handlePages}>
          Next
        </Button>
      </Col>
    </Row>
  );
};

export default Pagination;
