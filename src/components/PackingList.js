import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, onDeleteItem, onToggleItems, setItems }) {
    const [sortBy, setSortBy] = useState("input")
    let sortedItems;

    if (sortBy === 'input') sortedItems = items;
    if (sortBy === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

    function handleDeleteList() {
        const confirmed = window.confirm('Are you sure you want to delet all items?');
        if (confirmed) setItems([]);
    }

    return (
        <div className="list">
            <ul>
                {sortedItems.map(item => <Item onDeleteItem={onDeleteItem} onToggleItems={onToggleItems} item={item} key={item} />)}
            </ul>

            <div className="actions">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="input">
                        Sort by input order
                    </option>
                    <option value='description'>
                        Sort by discription
                    </option>
                    <option value='packed'>
                        Sort by packed status
                    </option>
                </select>
                <button onClick={handleDeleteList}>Clear list</button>
            </div>
        </div>
    );
}