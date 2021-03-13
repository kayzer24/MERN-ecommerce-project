import React from 'react';

const LocalSearch = ({keyword, setKeyword}) => {
	const handleSearcheChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value.toLowerCase());
	};

	return (
		<input
			className="form-control mb-4"
			type="search"
			value={keyword}
			placeholder="Filter"
			onChange={handleSearcheChange}
		/>
	);
}

export default LocalSearch;