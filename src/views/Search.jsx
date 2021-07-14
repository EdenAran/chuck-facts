import { useState } from "react";
import { FactsList } from "../cmps/FactsList";
import { SearchBox } from "../cmps/SerchBox"
import { factService } from "../services/fact.service";

export const Search = () => {
    const [facts, setFacts] = useState();
    const [searchParams, setSearchParams] = useState();

    const handleChange = ({ target }) => {
        const values = target.value;
        setSearchParams(values);
    }

    const searchFacts = async (ev) => {
        ev.preventDefault();
        let newFacts = await factService.getFacts(searchParams);
        newFacts = newFacts.result.sort((f1, f2) => {
            return f1.created_at.localeCompare(f2.created_at)
        });
        setFacts([...newFacts]);
    }
    const sortFacts = (diff) => {
        const newFacts = facts.sort((f1, f2) => {
            return f1.created_at.localeCompare(f2.created_at) * diff
        });
        setFacts([...newFacts]);
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
            {facts && <FactsList facts={facts} sort={sortFacts}></FactsList>}
        </main>
    )
}