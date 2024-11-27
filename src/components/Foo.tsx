import { ChangeEvent, useState } from 'react';

function Foo() {
    const [searchValue, setSearchValue] = useState('');

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
    }

    return (
        <div>
            <label htmlFor="search">Search</label>
            <input
                id="search"
                type="text"
                value={searchValue}
                onChange={handleChange}
            />
            <p>Searches for {searchValue ? searchValue : '...'}</p>
        </div>
    );
}

export default Foo;