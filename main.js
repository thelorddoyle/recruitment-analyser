const codeForm = document.getElementById("codeForm");
const codeInput = document.getElementById("codeInput");
const resultDiv = document.getElementById("result");

const serverURL = "https://imx-code-analyser.herokuapp.com";

codeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const code = codeInput.value;

  if (code) {
    try {
      resultDiv.innerHTML = "Processing...";
      const response = await assessCodeQuality(code);
      resultDiv.innerHTML = response;
    } catch (error) {
      resultDiv.innerHTML = "An error occurred.";
      console.error(error);
    }
  }
});

async function assessCodeQuality(codeContent) {
  const response = await fetch(`${serverURL}/assess-code-quality`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: codeContent }),
  });

  if (!response.ok) {
    throw new Error("Error fetching data from server");
  }

  const data = await response.json();
  return data.result;
}
