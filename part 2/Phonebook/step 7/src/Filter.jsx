const Filter = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default Filter;
