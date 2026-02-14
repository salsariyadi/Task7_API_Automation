import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";

describe("API Test Suite JSONPlaceholder", function () {

  const ajv = new Ajv();

  it("GET Single Post", async function () {

    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    expect(response.status).to.equal(200);

    const data = await response.json();

    const schemaGet = {
      type: "object",
      properties: {
        userId: { type: "number" },
        id: { type: "number" },
        title: { type: "string" },
        body: { type: "string" }
      },
      required: ["userId", "id", "title", "body"],
      additionalProperties: false
    };

    const validate = ajv.compile(schemaGet);
    const valid = validate(data);

    expect(valid).to.be.true;

  });


  it("POST Create New Post", async function () {

    const payload = {
      title: "foo",
      body: "bar",
      userId: 1
    };

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    expect(response.status).to.equal(201);

    const data = await response.json();

    const schemaPost = {
      type: "object",
      properties: {
        title: { type: "string" },
        body: { type: "string" },
        userId: { type: "number" },
        id: { type: "number" }
      },
      required: ["title", "body", "userId", "id"],
      additionalProperties: false
    };

    const validate = ajv.compile(schemaPost);
    const valid = validate(data);

    expect(valid).to.be.true;

  });

});
