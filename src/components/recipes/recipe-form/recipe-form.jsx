import React from "react";

// Components
import InputField from "../../form/input-field/input-field";
import InputCheckbox from "../../form/input-checkbox/input-checkbox";

// Styles
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const RecipeForm = () => {
  return (
    <Form>
      <InputField type="text" name="newRecipe" label="Recipe Name" placeholder="Recipe name" />
      <InputField type="text" name="sourceName" label="Source" placeholder="Source" />
      <InputField type="url" name="sourceUrl" label="Link To Source" placeholder="Link to source" />

      <Form.File
        className="position-relative"
        name="file-image"
        label="Image"
        id="file"
        // feedbackTooltip
      />

      {/* Description */}
      <InputField
        type="text"
        name="description"
        label="General description, will be presented below the title"
        placeholder="Go wild..."
      />
      <InputCheckbox />

      {/* Ingredients */}
      <Form.Row>
        <Form.Group as={Col} controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="measurement">
          <Form.Label>Measurement Units</Form.Label>
          <Form.Control as="select" defaultValue="Choose...">
            <option>g</option>
            <option>teaspoon</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="remark">
          <Form.Label>Remark</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Button>Save</Button>
          <Button>Clear</Button>
        </Form.Group>
      </Form.Row>

      {/* Instructions */}
      <Form.Row>
        <Form.Group as={Col} controlId="stageNumber">
          <Form.Label>#</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="instruction">
          <Form.Label>Instruction</Form.Label>
          <Form.Control as="select" defaultValue="Choose...">
            <option>g</option>
            <option>teaspoon</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="save">
          <Button>Save</Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default RecipeForm;
