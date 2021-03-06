import { deleteTemplate } from "controllers/template";

describe("Delete Template Controller", () => {
  it("handles valid delete template requests", () => {
    const res = mockResponse();
    const req = mockRequest();

    deleteTemplate(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "Route not setup." });
  });
});
