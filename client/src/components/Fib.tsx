import React, { FormEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Fib: React.FC = (): JSX.Element => {
  const [index, setIndex] = useState("");
  const [seenIndexes, setSeenIndexes] = useState<Array<{ number: number }>>();
  const [values, setValues] = useState<{ [key: string]: number }>({});

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };
  const fetchIndexes = async () => {
    const seenIndexes = await axios.get<Array<{ number: number }>>(
      "/api/values/all"
    );
    setSeenIndexes(seenIndexes.data);
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(e.target.value);
  };
  const renderSeenIndexes = () => {
    return seenIndexes?.map(({ number }) => number).join(",");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post("/api/values", {
      index: index,
    });
    setIndex("");
  };
  const renderValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key}, value:{values[key]}
        </div>
      );
    }
  };
  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);
  return (
    <div>
      <h1 className="header">Fib Calculator</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <label htmlFor="">Enter index</label>
        <input name="index" value={index} onChange={onChangeInput} />
        <button type="submit">Submit</button>
      </form>
      <h3>Tried indexes:</h3>
      {renderSeenIndexes()}
      <h3>Calculated Values:</h3>
      {renderValues()}

      <Link to="/other">Go other</Link>
    </div>
  );
};

export default Fib;
