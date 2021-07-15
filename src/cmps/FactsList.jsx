import { utilService } from "../services/util.service"
import { useEffect, useState } from "react"
import { FactPreview } from "./FactPreview"
import Moment from "react-moment"

export const FactsList = ({ facts, sortFacts }) => {
    const [diff, setDiff] = useState(1);
    const [selectedFact, setSelectedFact] = useState(null);

    useEffect(() => {
        sortFacts(diff);
        // eslint-disable-next-line
    }, [diff])

    const selectFact = (fact) => {
        if (selectedFact?.id === fact.id) {
            setSelectedFact(null);
            return;
        }
        setSelectedFact({ ...fact });
    }

    const isSelected = (factId) => {
        return selectedFact?.id === factId;
    }

    return (
        <div className="facts-list">
            <div className="fact">
                <span className="id header">
                    ID
                    <img src={require('../assets/img/filter.svg').default} alt="filter" />
                </span>
                <span className="category header">
                    Category
                    <img src={require('../assets/img/filter.svg').default} alt="filter" />
                </span>
                <span className="date header">
                    Date Created
                    <img className={diff > 0 ? '' : 'up'} src={require('../assets/img/arrow.svg').default} onClick={() => setDiff(diff * -1)} alt="sort" />
                    <img src={require('../assets/img/filter.svg').default} alt="filter" />
                </span>
            </div>
            {facts.map(fact =>
                <div className={'fact ' + (isSelected(fact.id) ? 'selected' : '')} key={fact.id} onClick={() => selectFact(fact)}>
                    <span className="id">{fact.id}</span>
                    <span className="category">{fact.categories.map(category => utilService.capitalize(category)).join(',')}</span>
                    <span className="date"><Moment date={fact.created_at} format="MMM DD, YYYY, hh:mm A" /></span>
                    <FactPreview fact={fact.value} className={isSelected(fact.id) ? 'open' : 'closed'} />
                </div>
            )}
        </div >
    )
}