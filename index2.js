
async function fetchData() {
  try {
    const response = await fetch("https://wizardkaushik.onrender.com/", {
      method: "post",
     
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify({
        
        "question" : "what is lithium?"
      }),
    });

    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    
    const data = await response.json();
    console.log(data);

  } catch (error) {
    
    console.error("Fetch error:", error);
  }
}

fetchData();