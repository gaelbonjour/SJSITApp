import { User } from "models";
import { updateMemberStatus } from "controllers/member";
import {
  missingUpdateMemberStatusParams,
  unableToLocateMember,
} from "shared/authErrors";

const findExistingMember = email => User.findOne({ email });

describe("Update Member Status Controller", () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  let db;
  beforeAll(() => {
    db = connectDatabase();
  });
  afterAll(async () => {
    await db.close();
  });

  it("handles empty body requests", async () => {
    const emptyBody = {
      _id: "",
      status: "",
    };
    const req = mockRequest(null, null, emptyBody);

    await updateMemberStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingUpdateMemberStatusParams,
    });
  });

  it("handles invalid id update member status requests", async () => {
    const _id = "5d3b30c98b651c118b49938c";
    const invalidMember = {
      _id,
      status: "active",
    };
    const req = mockRequest(null, null, invalidMember);

    await updateMemberStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocateMember,
    });
  });

  it("handles valid reactivate/suspend member requests", async () => {
    const email = "member299@example.com";
    let existingMember = await findExistingMember(email);

    let req = mockRequest(null, null, {
      _id: existingMember._id,
      status: existingMember.status,
    });

    await updateMemberStatus(req, res);

    existingMember = await findExistingMember(email);
    expect(existingMember.status).toEqual("suspended");

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Member has been suspended.",
    });

    res = mockResponse();
    req = mockRequest(null, null, {
      _id: existingMember._id,
      status: existingMember.status,
    });

    await updateMemberStatus(req, res);

    existingMember = await findExistingMember(email);
    expect(existingMember.status).toEqual("active");

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Member has been reactivated.",
    });
  });
});
