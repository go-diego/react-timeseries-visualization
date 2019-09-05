import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function DateTimePicker({ onChange, value, label, min, max }) {
  return (
    <Container>
      <label>{label}</label>
      <input
        value={value}
        type="datetime-local"
        min={min}
        max={max}
        onChange={e => onChange(e.target.value)}
      />
    </Container>
  );
}
