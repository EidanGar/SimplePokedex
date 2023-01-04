import React, { useContext, useState, useRef } from "react";
import {
  Card,
  Badge,
  Row,
  Col,
  Form,
  InputGroup,
  Button
} from "react-bootstrap";
import { Pokemon } from "../pages";
import PokemonAppData from "../pages/PokemonContext";

const PokemonInfoCard = () => {
  const { selected } = useContext(PokemonAppData);
  const [generation, setGeneration] = useState("");
  const [isShiny, setIsShiny] = useState(false);

  const SelectElement = useRef<HTMLSelectElement | null>(null);

  function checkSelected(selected: string | number | Pokemon): boolean {
    return typeof selected !== "number" && typeof selected !== "string";
  }

  const CardStyles: React.CSSProperties = {
    position: "fixed",
    bottom: "50%",
    right: "10vw",
    width: "25vw",
    minWidth: "300px",
    maxWidth: "450px",
    transform: "translateY(50%)"
  };

  return (
    <Card style={CardStyles} className="mt-3">
      <Card.Img
        variant="top"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          generation + (isShiny ? "shiny/" : "") + selected.id
        }.${generation === "other/dream-world/" ? "svg" : "png"}`}
        onError={() => {
          alert("No Image.");
          setGeneration("");
          if (SelectElement.current !== null) {
            SelectElement.current.options[0].selected = true;
          }
        }}
        className="mx-auto p-2"
        style={{ maxWidth: 250, maxHeight: 250, minHeight: 100, minWidth: 100 }}
      />
      <InputGroup>
        <Button
          title={!isShiny ? "Default" : "Shiny"}
          onClick={() => setIsShiny((prev) => !prev)}
          style={{ cursor: "pointer", whiteSpace: "nowrap" }}
          variant={`${isShiny ? "secondary" : "primary"}`}
          className="rounded-0 w-25"
        >
          {isShiny ? "Default" : "Shiny"}
        </Button>
        <Form.Select
          ref={SelectElement}
          onChange={(e) => setGeneration(e.target.value)}
          size="sm"
          aria-label="Default select example"
          className="text-center rounded-0"
          style={{ cursor: "pointer" }}
        >
          <option value="">Sprites</option>
          <option value="versions/generation-i/red-blue/">Gen 1</option>
          <option value="versions/generation-ii/crystal/">Gen 2</option>
          <option value="versions/generation-iii/emerald/">Gen 3</option>
          <option value="versions/generation-iv/diamond-pearl/">Gen 4</option>
          <option value="versions/generation-v/black-white/">Gen 5</option>
          <option value="versions/generation-vi/omegaruby-alphasapphire/">
            Gen 6
          </option>
          <option value="versions/generation-vii/ultra-sun-ultra-moon/">
            Gen 7
          </option>
          <option value="other/dream-world/">Dream World</option>
        </Form.Select>
      </InputGroup>

      <Card.Header>
        <div className="d-flex justify-content-between">
          <div>{checkSelected(selected) && selected.name.english}</div>
          <div>
            {checkSelected(selected) &&
              selected.type.map((type: string) => (
                <Badge
                  className="me-1 text-light bg-primary text-center"
                  key={type}
                >
                  <span
                    style={{ fontSize: "14px" }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    {type}
                  </span>
                </Badge>
              ))}
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs={6}>
            <Card.Text>
              <b>HP:</b> {selected.base.HP}
            </Card.Text>
            <Card.Text>
              <b>Attack:</b> {selected.base.Attack}
            </Card.Text>
            <Card.Text>
              <b>Defense:</b> {selected.base.Defense}
            </Card.Text>
          </Col>
          <Col xs={6}>
            <Card.Text>
              <b>Sp. Attack:</b> {selected.base["Sp. Attack"]}
            </Card.Text>
            <Card.Text>
              <b>Sp. Defense:</b> {selected.base["Sp. Defense"]}
            </Card.Text>
            <Card.Text>
              <b>Speed:</b> {selected.base.Speed}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default React.memo(PokemonInfoCard);
