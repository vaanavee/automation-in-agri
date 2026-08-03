const handleRegister = async (e) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
    console.log("Sending request to backend...");

    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        farmSize: parseFloat(formData.farmSize),
      }),
    });

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", data);

    if (response.ok) {
      alert("Registration successful!");
      navigate("/login");
    } else {
      setError(data.detail || JSON.stringify(data));
    }
  } catch (err) {
    console.error("Fetch Error:", err);
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};