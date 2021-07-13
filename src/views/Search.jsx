import { useState } from "react";
import { SearchBox } from "../cmps/SerchBox"
import { factService } from "../services/fact.service";

export const Search = () => {

    const [facts, setFacts] = useState([]);
    const [searchParams, setSearchParams] = useState([]);

    const handleChange = ({ target }) => {
        const values = target.value;
        // const values = target.value.split(',');
        console.log('value:', values)
        setSearchParams(values);
    }

    const searchFacts = async (ev) => {
        ev.preventDefault();
        const newFacts = await factService.getFacts(searchParams);
        // setFacts({ ...facts, ...newFacts });
    }

    const isButtonActive = () => {
        return searchParams?.length > 0;
    }

    return (
        <main className="search main-layout">
            <SearchBox searchFact={searchFacts} isActive={isButtonActive()}>
                <div className="search">
                    <label>Key Word(s):</label>
                    <input name="search" type="text" placeholder="e.g egg, break, Chuck Norris, dumb" onChange={handleChange} />
                </div>
            </SearchBox>

        </main>
    )
}