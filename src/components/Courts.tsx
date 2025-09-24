import React, { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import API from "../api";

// ✅ Define the Court interface
interface Court {
  _id: string;
  courtNo: string;
  pricePerHour: number;
  fromHour: string;
  toHour: string;
  image: string;
}

// ✅ Form state type
interface CourtForm {
  courtNo: string;
  pricePerHour: number;
  fromHour: string;
  toHour: string;
  image: string;
}

const Courts: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [form, setForm] = useState<CourtForm>({
    courtNo: "",
    pricePerHour: 500,
    fromHour: "",
    toHour: "",
    image: "",
  });

  // 🔹 Fetch courts from backend
  useEffect(() => {
    API.get<Court[]>("/courts")
      .then((res) => setCourts(res.data))
      .catch((err) => console.error("Failed to fetch courts:", err));
  }, []);

  // 🔹 Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "pricePerHour" ? Number(value) : value });
  };

  // 🔹 Submit new court
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post<Court>("/courts", form);
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
          <li key={court._id} style={{ marginBottom: "20px" }}>
            <strong>{court.courtNo}</strong> — {court.pricePerHour} MMK/hour
            <br />
            Available: {court.fromHour} to {court.toHour}
            <br />
            <img src={court.image} alt={court.courtNo} width={200} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courts;
