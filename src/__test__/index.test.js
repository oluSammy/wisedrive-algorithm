const { modifyVehicleType, matchCarTypeToID } = require("../index");

describe("modify vehicle model name", () => {
  test("remove space and convert name to lowercase", () => {
    const result = modifyVehicleType("X3 XDRIVE 20I");
    expect(result).toBe("x3xdrive20i");
  });
});

describe("match model to car ids", () => {
  test("return cardIds that belong to a model", () => {
    const expected = { model: "X3 XDRIVE 20I", ids: ["11954"] };

    const result = matchCarTypeToID("X3 XDRIVE 20I");
    expect(result).toMatchObject(expected);
  });
});
