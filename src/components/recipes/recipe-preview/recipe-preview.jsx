import React from "react";


// Styles
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';

const RecipePreview = ({
  data: {
    recipe: { label, image, url },
    recipe
  },
}) => {
  return (
    <Col sm={6} md={4}>
      <Card onClick={() => console.log(recipe)}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{label}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's
            content.
          </Card.Text>
          <Button variant="light" onClick={(e) => e.stopPropagation()}>
            <a target="_blank" rel="noopener noreferrer" href={url}>
              Source
            </a>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RecipePreview;
