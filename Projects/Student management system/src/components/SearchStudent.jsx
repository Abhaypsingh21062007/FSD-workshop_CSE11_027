// SearchStudent component - search bar for filtering students
function SearchStudent({ searchTerm, onSearchChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search by Student ID or Name"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchStudent;
