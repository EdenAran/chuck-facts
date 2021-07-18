import { useState } from "react";
import { FactsList } from "../cmps/FactsList";
import { SearchBox } from "../cmps/SerchBox"
import { factService } from "../services/fact.service";

export const Search = () => {
    const [facts, setFacts] = useState(null);
    const [searchParams, setSearchParams] = useState(null);
    const [diff, setDiff] = useState(1);

    const handleChange = ({ target }) => {
        const values = target.value;
        setSearchParams(values);
    }

    const getFacts = async (ev) => {
        ev.preventDefault();
        try {
            const newFacts = await factService.getFacts(searchParams);
            setFacts(newFacts.result);
        } catch (err) {
            console.log('Error getting facts:', err.response.data.message);
        }
    }

    const factsToShow = () => {
        return facts.sort((f1, f2) => {
            return f1.created_at.localeCompare(f2.created_at) * diff
        });
    }

    const isButtonActive = () => {
        return searchParams?.length > 0;
    }

    return (
        <main className="search main-layout">
            <SearchBox searchFact={getFacts} isActive={isButtonActive()}>
                <div className="search">
                    <label>Key Word(s):</label>
                    <input name="search" type="text" placeholder="e.g egg, break, Chuck Norris, dumb" onChange={handleChange} />
                </div>
            </SearchBox>
            {facts?.length > 0 && <FactsList facts={factsToShow()} setFilter={() => setDiff(diff * -1)} diff={diff} ></FactsList>}
        </main>
    )
}