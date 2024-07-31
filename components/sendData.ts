export default async function SendData(
  route,
  data,
  contentType = "application/json",
  stringify = true
) {
  try {
    var response = await fetch(`/api/${route}`, {
      body: stringify ? JSON.stringify(data) : data,
      method: "POST",
      contentType: contentType,
    });
    var res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
