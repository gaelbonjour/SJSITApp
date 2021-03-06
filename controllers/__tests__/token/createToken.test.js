import { Mail, Token, Season } from "models";
import { createToken } from "controllers/token";
import {
  emailAssociatedWithKey,
  invalidAuthTokenRequest,
} from "shared/authErrors";

describe("Create Token Controller", () => {
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
      authorizedEmail: "",
      role: "",
    };

    const req = mockRequest(null, null, emptyBody);

    await createToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidAuthTokenRequest,
    });
  });

  it("handles requests with invalid bodies", async () => {
    const invalidSeason = {
      authorizedEmail: { email: "test@example.com" },
      role: "employee",
    };

    const req = mockRequest(null, null, invalidSeason);

    await createToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: expect.stringContaining("CastError"),
    });
  });

  it("handles requests with emails that are already associated with an active account", async () => {
    const emailInUse = {
      authorizedEmail: "member@example.com",
      role: "employee",
    };

    const req = mockRequest(null, null, emailInUse);

    await createToken(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: emailAssociatedWithKey,
    });
  });

  it("handles valid create token (new hire) requests", async () => {
    const mailSpy = jest.spyOn(Mail, "create");

    const newSeason = {
      seasonId: "20202021",
      startDate: new Date(2020, 9, 6),
      endDate: new Date(2021, 7, 6),
    };
    await Season.create(newSeason);

    const newHire = {
      authorizedEmail: "newhire@example.com",
      role: "employee",
      seasonId: newSeason.seasonId,
    };

    const req = mockRequest(null, null, newHire);

    await createToken(req, res);

    const newToken = await Token.findOne({
      authorizedEmail: newHire.authorizedEmail,
    });

    expect(newToken).toEqual(
      expect.objectContaining({
        __v: expect.any(Number),
        _id: expect.any(ObjectId),
        authorizedEmail: expect.any(String),
        role: expect.any(String),
        token: expect.any(String),
      }),
    );

    expect(mailSpy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `Succesfully created and sent an authorization key to ${newHire.authorizedEmail}.`,
    });
  });
});
