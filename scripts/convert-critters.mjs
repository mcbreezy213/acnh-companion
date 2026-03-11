import fs from "fs";
import path from "path";

const inputPath = path.resolve("data/critters-template.csv");
const outputPath = path.resolve("data/critters.ts");

function parseNumberList(value) {
  if (!value || value.trim() === "") return [];
  return value
    .split("|")
    .map((item) => Number(item.trim()))
    .filter((num) => !Number.isNaN(num));
}

function escapeString(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function parseCsv(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error("CSV must contain a header and at least one data row.");
  }

  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line, rowIndex) => {
    const values = line.split(",").map((v) => v.trim());

    if (values.length !== headers.length) {
      throw new Error(
        `Row ${rowIndex + 2} has ${values.length} values, expected ${headers.length}.`
      );
    }

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });

    return row;
  });
}

function validateType(type, rowNumber) {
  const validTypes = ["fish", "bug", "sea"];
  if (!validTypes.includes(type)) {
    throw new Error(
      `Row ${rowNumber}: invalid type "${type}". Use fish, bug, or sea.`
    );
  }
}

function buildCritterObject(row, rowNumber) {
  const id = Number(row.id);
  const price = Number(row.price);

  if (Number.isNaN(id)) {
    throw new Error(`Row ${rowNumber}: id must be a number.`);
  }

  if (Number.isNaN(price)) {
    throw new Error(`Row ${rowNumber}: price must be a number.`);
  }

  validateType(row.type, rowNumber);

  const critter = {
    id,
    name: row.name,
    type: row.type,
    price,
    location: row.location,
    monthsNorth: parseNumberList(row.monthsNorth),
    monthsSouth: parseNumberList(row.monthsSouth),
    hours: parseNumberList(row.hours),
  };

  if (row.shadowSize) {
    critter.shadowSize = row.shadowSize;
  }

  if (row.speed) {
    critter.speed = row.speed;
  }

  return critter;
}

function critterToTs(critter) {
  const lines = [
    "  {",
    `    id: ${critter.id},`,
    `    name: "${escapeString(critter.name)}",`,
    `    type: "${critter.type}",`,
    `    price: ${critter.price},`,
    `    location: "${escapeString(critter.location)}",`,
  ];

  if (critter.shadowSize) {
    lines.push(`    shadowSize: "${escapeString(critter.shadowSize)}",`);
  }

  if (critter.speed) {
    lines.push(`    speed: "${escapeString(critter.speed)}",`);
  }

  lines.push(
    `    monthsNorth: [${critter.monthsNorth.join(", ")}],`,
    `    monthsSouth: [${critter.monthsSouth.join(", ")}],`,
    `    hours: [${critter.hours.join(", ")}],`,
    "  }"
  );

  return lines.join("\n");
}

try {
  const csvText = fs.readFileSync(inputPath, "utf8");
  const rows = parseCsv(csvText);
  const critters = rows.map((row, index) => buildCritterObject(row, index + 2));

  const output = `import type { Critter } from "../types";

export const critters: Critter[] = [
${critters.map(critterToTs).join(",\n")}
];
`;

  fs.writeFileSync(outputPath, output, "utf8");
  console.log(`Converted ${critters.length} critters to ${outputPath}`);
} catch (error) {
  console.error("Conversion failed:");
  console.error(error.message);
  process.exit(1);
}