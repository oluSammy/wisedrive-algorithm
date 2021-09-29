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
 * function that
 * @param {string} path -- path to csv file
 * @param {string} vehicleType -- vehicle Type
 * @param {number} position -- position of id on line
 * @param {string} outputPath -- path to write the output ids
 */

const vehicleMatching = (inputPath, vehicleType, position, outputPath) => {
  const ReadableStream = fs.createReadStream(inputPath, "utf-8");

  const rl = readline.createInterface({
    input: ReadableStream,
    output: process.stdout,
    terminal: false,
  });

  rl.on("line", (line) => {
    const newLine = JSON.parse(JSON.stringify(line));
    const lineArray = newLine.split(",");
    if (vehicleType === modifyVehicleType(lineArray[position])) {
      console.log(lineArray[0]);

      fs.appendFileSync(outputPath, `${lineArray[0]}\n`);
    }
  });
};

const matchVehicleToId = (id) => {
  const newVehicleType = modifyVehicleType(id);
  const outputPath = path.join(__dirname, `./output/${newVehicleType}_IDS.csv`);

  // delete file if it exists
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }

  vehicleMatching(vehicleBmwPath, newVehicleType, 2, outputPath);
  vehicleMatching(vehicleTypePath, newVehicleType, 4, outputPath);
};

matchVehicleToId("535 d xDrive");
