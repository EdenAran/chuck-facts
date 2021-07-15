import { useEffect, useRef, useState } from "react";
import { SearchBox } from "../cmps/SerchBox"
import { factService } from '../services/fact.service'
import Select from "react-select";
import { FactPreview } from "../cmps/FactPreview";
import { utilService } from "../services/util.service";

export const HomePage = () => {

    const [fact, setFact] = useState(null);
    const [categories, setCategories] = useState(null);
    const [searchParams, setSearchParams] = useState({ name: '', category: '' });
    const selectRef = useRef(null);

    useEffect(() => {
        //Fixes UI bug from react-select library
        selectRef.current.focus()
        selectRef.current.blur()
        getCategories();
    }, [])

    const getCategories = async () => {
        let newCategories = await factService.getCategories();
        newCategories = newCategories.map(category => ({ value: category, label: utilService.capitalize(category) }));
        newCategories.unshift({ value: 'all', label: 'All Categories' });
        setCategories(newCategories);
    }

    const handleChange = (ev) => {
        if (ev.target) {
            const value = ev.target.value;
            setSearchParams({ ...searchParams, name: value });
        }
        else {
            const values = ev.map(option => option.value).join(',')
            setSearchParams({ ...searchParams, category: values });
        }
    }

    const searchFact = async (ev) => {
        ev.preventDefault();
        const newFact = await factService.getRandomFact(searchParams);
        setFact(newFact);
    }

    const isButtonActive = () => {
        const isActive = searchParams.name.length && searchParams.category.length;
        return isActive;
    }

    const isOptionDisabled = (option) => {
        return (option.value === 'all' && searchParams.category.length) || (option.value !== 'all' && searchParams.category.includes('all'))
    }

    return (
        <main className="home-page main-layout">
            <SearchBox searchFact={searchFact} isActive={isButtonActive()}>
                <div className="search">
                    <span className="search-name">
                        <label>Your Name</label>
                        <input type="text" name="name" placeholder="e.g Chuck Norris" value={searchParams.name} onChange={handleChange} />
                    </span>
                    <span className="search-category">
                        <label name="category">Category</label>
                        <Select
                            placeholder={<span className="placeholder">Pick a category</span>}
                            ref={selectRef}
                            hideSelectedOptions={false}
                            isMulti
                            name="category"
                            className="select"
                            isOptionDisabled={isOptionDisabled}
                            options={categories}
                            onChange={handleChange}
                        />
                    </span>
                </div>
            </SearchBox>
            {fact && <FactPreview fact={fact.value}></FactPreview>}
        </main>
    )
}