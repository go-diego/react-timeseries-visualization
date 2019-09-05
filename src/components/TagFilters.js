import React from "react";
import styled from "styled-components";

const Tag = styled.span`
  cursor: ${props => (!props.isActive ? "pointer" : "default")};
`;

export default function TagFilters({
  label,
  onFilterSelect,
  onFilterDeselect
}) {
  const [isActive, setIsActive] = React.useState(false);

  function handleActivate() {
    setIsActive(true);
    if (onFilterSelect) onFilterSelect(label);
  }

  function handleDeactivate() {
    setIsActive(false);
    if (onFilterDeselect) onFilterDeselect(label);
  }

  return (
    <div className="control">
      <div className="tags has-addons">
        <Tag
          data-testid="filter-tag"
          onClick={handleActivate}
          isActive={isActive}
          className={`tag ${isActive ? "is-primary" : ""}`}
        >
          {label}
        </Tag>
        {isActive && (
          <a
            data-testid="filter-deselect"
            onClick={handleDeactivate}
            className="tag is-delete"
          />
        )}
      </div>
    </div>
  );
}
