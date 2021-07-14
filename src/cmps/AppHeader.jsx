

export const AppHeader = () => {

    return(
        <header className="app-header">
            <div className="hero">
                <img src={require('../assets/img/hero.png').default} alt="" />
            </div>
            <div className="img-container">
                <img src={require('../assets/img/logo.svg').default} alt="" />
            </div>
        </header>
    )
}