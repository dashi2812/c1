// function sendForm(formData) {
//   return new Promise((resolve, reject) => {
//     fetch("https://server-ix74.onrender.com/submit", {
//       method: "POST",
//       body: formData,
//      // credentials: "include" // only if you need cookies
//     })
//     .then(response => {
//       if (!response.ok) {
//         reject("Server returned " + response.status);
//       }
//       return response.json();
//     })
//     .then(data => resolve(data))
//     .catch(error => reject(error));
//   });
// }

function sendForm(formData) {
  return fetch("https://server-ix74.onrender.com/submit", {
    method: "POST",
    body: formData,
  })
  .then(async response => {
    // Try to read JSON no matter what
    const data = await response.json().catch(() => null);

    console.log("Server response JSON:", data);

    if (!response.ok) {
      // Reject with server message if available
      throw {
        status: response.status,
        data: data
      };
    }

    return data;
  });
}


// Usage
document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const formData = new FormData(this);

  sendForm(formData)
    .then(data => {
      console.log("Server response:", data);
      alert("✅ " + data.message);
    })
    .catch(err => {
      console.error("Error:", err);
      alert("❌ Failed: " + "Server Error!, please try later");
    });
});

// Ping function
// function pingRender() {
//   fetch("https://mysqft-crm.onrender.com/ping")
//     .then(res => console.log("Ping OK:", res.status))
//     .catch(err => console.error("Ping failed:", err));
// }

// // Run immediately once
// pingRender();

// // Then run every 5 minutes (300000 ms)
// setInterval(pingRender, 300000);


