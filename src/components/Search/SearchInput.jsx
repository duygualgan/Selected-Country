import React, { useState } from 'react'

const SearchInput = ({onSearch}) => {
    
    const [input, setInput] = useState('');
    const [previousInput, setPreviousInput] = useState('');

    const submitHandler = (e)=>{
        e.preventDefault()
        onSearch(input)
    }

    let searchTimeout;

    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      setInput(inputValue);
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (inputValue !== previousInput && inputValue.trim() !== '') {
          onSearch(inputValue);
        }
        setPreviousInput(inputValue);
      }, 300);
    };



  return (
    <form onSubmit={submitHandler}>
        <input type="text" placeholder='Search a country' value={input} onChange={handleInputChange} />
    </form>
  )
}

export default SearchInput