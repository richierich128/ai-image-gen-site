document.getElementById("generate").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value.trim();
  const status = document.getElementById("status");
  const imageContainer = document.getElementById("image-container");

  if (!prompt) {
    alert("Please enter a prompt.");
    return;
  }

  status.innerText = "Generating image...";
  imageContainer.innerHTML = "";

  try {
    const response = await fetch("https://YOUR_NGROK_URL_HERE.ngrok.io/sdapi/v1/txt2img", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt, steps: 20 })
    });

    const data = await response.json();
    const base64Image = data.images[0];
    const img = document.createElement("img");
    img.src = "data:image/png;base64," + base64Image;
    imageContainer.appendChild(img);
    status.innerText = "";
  } catch (error) {
    console.error("Error:", error);
    status.innerText = "Failed to generate image.";
  }
});
