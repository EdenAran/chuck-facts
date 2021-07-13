import { useEffect, useState } from "react";
import { SearchBox } from "../cmps/SerchBox"
import { factService } from '../services/fact.service'
import Select from "react-select";
import { FactPreview } from "../cmps/FactsPreview";

export const HomePage = () => {

    const [fact, setFact] = useState();
    const [categories, setCategories] = useState();
    const [searchParams, setSearchParams] = useState({name:'', category:''});

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        let newCategories = await factService.getCategories();
        newCategories = newCategories.map(category => ({ value: category, label: capitalize(category) }));
        newCategories.unshift({ value: 'all', label: 'All Categories' })
        setCategories(newCategories);
    }
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }
    const handleChange = (ev) => {
        if (ev.target) {
            const value = ev.target.value;
            setSearchParams({ ...searchParams, name: value });
        }
        else {
            const values = ev.map(option => option.value).join(',')
            console.log('values:', values)
            setSearchParams({ ...searchParams, category: values });
        }
    }

    const searchFact = async (ev) => {
        ev.preventDefault();
        const newFact = await factService.getRandomFact(searchParams);
        console.log('newFact:', newFact)
        setFact({ ...fact, ...newFact });
    }

    const isButtonActive = () => {
        const isActive = searchParams.name.length > 0 && searchParams.category.length;
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
                            hideSelectedOptions={false}
                            isMulti 
                            name="category" 
                            className="select" 
                            placeholder="Pick a category" 
                            isOptionDisabled={isOptionDisabled}
                            options={categories} 
                            onChange={handleChange} >
                        </Select>
                    </span>
                </div>
            </SearchBox>
            <FactPreview fact={fact?.value}></FactPreview>
        </main>
    )
}