const fs = require("fs");
const path = require("path");
const readline = require("readline");

const vehicleTypePath = path.join(__dirname, "./data/vehicle_types.csv");
const vehicleBmwPath = path.join(__dirname, "./data/vehicles_bmw.csv");

/**
 * functions strips empty spaces from a string and converts it to lowercase
 * @param {string} vehicleType
 * @returns {string} a string with no space and lowercase character
 */
const modifyVehicleType = (vehicleType) => {
  return vehicleType.replace(/\s/g, "").toLowerCase();
};

/**
 * functions converts string to date
 * @param {string} str
 * @returns {date} date
 */
const getConstructionDate = (str) => {
  if (!str.length) return new Date(Date.now());

  const year = str.slice(0, 4);
  const month = str.slice(4);

  const date = new Date(`${year}-${month}-01`);

  return date;
};

/**
 *
 * @param {string} model
 * @returns array of matched cars
 */
const getVehicleBmw = (model) => {
  // read vehicle bmw file
  const data = fs.readFileSync(vehicleBmwPath, "utf-8");

  const dataArray = data.split("\n"); // split file by next line

  const matchedVehicles = dataArray.filter(
    (carRecord) => carRecord.split(",")[2] === model
  );
  return matchedVehicles;
};

/**
 *
 * @param {array} matchedCars -- array of matched vehicles
 * @returns array of car ids
 */
const getVehicleIds = (matchedCars) => {
  const data = fs.readFileSync(vehicleTypePath, "utf-8");

  const dataArray = data.split("\n");
  dataArray.shift();

  let result = [];

  // loop through array of matched cars
  matchedCars.forEach((matchedVehicle) => {
    const vehicleData = matchedVehicle.split(",");
    let modelId = modifyVehicleType(vehicleData[2]);
    regDate = new Date(vehicleData[3]).getTime();
    const modelName = vehicleData[2].split(" ");
    const shortModelName = modelName.shift();
    const longModelName = modifyVehicleType(modelName.join(""));

    const filteredData = dataArray.filter((vehicleType) => {
      const vehicleTypeArr = vehicleType.split(",");
      const typeName = modifyVehicleType(
        vehicleTypeArr[4].split("\r").join("")
      );
      const id = modifyVehicleType(modelId);
      const fromDate = getConstructionDate(vehicleTypeArr[1]).getTime();
      const toDate = getConstructionDate(vehicleTypeArr[2]).getTime();

      if (modelId.startsWith("x")) {
        const modelType = vehicleTypeArr[3];

        if (
          modelType.startsWith(shortModelName) &&
          longModelName === typeName &&
          regDate >= fromDate &&
          regDate <= toDate
        ) {
          return vehicleType;
        }
      } else {
        if (id === typeName) {
          if (regDate >= fromDate && regDate <= toDate) {
            return vehicleType;
          }
        }
      }
    });
    result = filteredData.map((car) => car.split(",")[0]);
  });

  return result;
};

/**
 *
 * @param {string}
 */
const matchCarTypeToID = (carType) => {
  let id = process.argv[2] || carType;
  const matchedCars = getVehicleBmw(id);
  const results = getVehicleIds(matchedCars);

  console.log({
    model: id,
    ids: results,
  });
  return {
    model: id,
    ids: results,
  };
};

matchCarTypeToID("X3 XDRIVE 20I");

module.exports = {
  modifyVehicleType,
  matchCarTypeToID,
};
