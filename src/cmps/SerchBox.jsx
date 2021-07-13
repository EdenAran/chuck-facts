
export const SearchBox = ({ children, searchFact, isActive }) => {

    return (
        <form className="search-box" onSubmit={searchFact}>
            {children}
            <button disabled={!isActive}>GO!</button>
        </form>
    )
}