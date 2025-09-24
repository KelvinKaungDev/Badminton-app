import React, { useState, useEffect } from "react";
import API from "../api";

function Courts() {
  const [courts, setCourts] = useState([]);
  const [form, setForm] = useState({
    courtNo: "",
    pricePerHour: 500,
    fromHour: "",
    toHour: "",
    image: "",
  });

  // 🔹 Fetch courts from backend
  useEffect(() => {
    API.get("/courts")
      .then((res) => setCourts(res.data))
      .catch((err) => console.error("Failed to fetch courts:", err));
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Submit new court
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/courts", form);
      setCourts([...courts, res.data]); // add new court to list
      setForm({ courtNo: "", pricePerHour: 500, fromHour: "", toHour: "", image: "" });
    } catch (err) {
      console.error("Failed to create court:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Badminton Courts</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="courtNo"
          placeholder="Court No"
          value={form.courtNo}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="pricePerHour"
          placeholder="Price"
          value={form.pricePerHour}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="fromHour"
          value={form.fromHour}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="toHour"
          value={form.toHour}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Court</button>
      </form>

      {/* Courts List */}
      <ul>
        {courts.map((court) => (
          <li key={court._id}>
            <strong>{court.courtNo}</strong> — {court.pricePerHour} MMK/hour
            <br />
            Available: {court.fromHour} to {court.toHour}
            <br />
            <img src={court.image} alt={court.courtNo} width="200" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courts;
