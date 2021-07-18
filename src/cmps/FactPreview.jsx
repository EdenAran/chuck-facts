import { useEffect, useRef } from 'react'

export const FactPreview = ({ fact, className }) => {

    const factRef = useRef(null);

    useEffect(() => {
        if (className === 'closed') return;
        const block = factRef.current.offsetHeight > window.innerHeight ? 'start' : 'center';
        console.log('block:', block)
        factRef.current?.scrollIntoView({ behavior: 'smooth', block });
    }, [className, fact])

    return (
        <div className={"fact-preview " + className} >
            <div className="fact-container" ref={factRef}>
                <div className="img-container top">
                    <img src={require('../assets/img/q-top.svg').default} alt="" />
                </div>
                <div className="img-container bottom">
                    <img src={require('../assets/img/q-bottom.svg').default} alt="" />
                </div>
                <p>{fact}</p>
            </div>
        </div >
    )
}