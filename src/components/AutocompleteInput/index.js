import React, { useState } from 'react';

const AutoCompleteInput = ({ data, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filteredSuggestions = data.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.name);
    setSuggestions([]);
    onChange(suggestion); // Pass the suggestion object to the parent component
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="border border-gray-300 p-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute border border-gray-300 bg-white w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-3 hover:bg-blue-100 cursor-pointer transition-colors duration-150 ease-in-out"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInput;
