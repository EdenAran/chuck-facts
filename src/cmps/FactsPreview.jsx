
export const FactPreview = ({ fact }) => {

    return (
        <div className="fact-preview">
            {fact && <div className="fact-container">
                <p>{fact}</p>
            </div>}
        </div>
    )
}