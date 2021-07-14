
export const FactPreview = ({ fact, className }) => {

    return (
        <div className={"fact-preview " + className }>
            <div className="fact-container">
                <div className="img-container top">
                    <img src={require('../assets/img/q-top.svg').default} alt="" />
                </div>
                <div className="img-container bottom">
                    <img src={require('../assets/img/q-bottom.svg').default} alt="" />
                </div>
                <p>{fact}</p>
            </div>
        </div>
    )
}