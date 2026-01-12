async function csvToJson(url) {
  // const url = "http://localhost:3000/docusaurus2025/csv/radiofoshan.csv";
  const raw_data = await (await fetch(url)).text();
  const raw_list = raw_data
    .split("\n")
    .filter((line) => line.trim()) // 新增：过滤空行
    .map((item) => item.split(",").map((cell) => cell.trim()));
  const headers = raw_list[0];
  const raw_json = raw_list.map((item, index) => {
    return headers.reduce((acc, key, index) => {
      acc[key] = item[index];
      return acc;
    }, {});
  });
  return raw_json.slice(1);
}

export default csvToJson;
