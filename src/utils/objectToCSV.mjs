export const objectToCSV = (arr, headers = extractHeaders(arr), omitHeaders = false) => {
  const headerRow = serializeRow(headers);
  const bodyRows = arr.map((obj) => serializeRow(headers.map((key) => obj[key])));
  return omitHeaders ? bodyRows.join("\n") : [headerRow, ...bodyRows].join("\n");
};

const escapeString = (item) => {
  const type = typeof item;
  switch (type) {
    case "string":
      return `${item}`;
    case "object":
      return `${JSON.stringify(item)}`;

    default:
      return item;
  }
};

const isEmptyValue = (value) => value === null || value === undefined || Number.isNaN(value);

const serializeValue = (value, delimiter = ",") => {
  if (isEmptyValue(value)) return "";
  const val = escapeString(value);
  if (val.includes(delimiter) || val.includes("\n") || val.includes('"'))
    return `"${val.replace(/"/g, '""').replace(/\n/g, "\\n")}"`;
  return val;
};

const serializeRow = (row, delimiter = ",") => row.map((value) => serializeValue(value)).join(delimiter);

const extractHeaders = (arr) => [
  ...arr.reduce((acc, obj) => {
    Object.keys(obj).forEach((key) => acc.add(key));
    return acc;
  }, new Set()),
];
