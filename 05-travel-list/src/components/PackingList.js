import { useState } from "react";

export default function PackingList({
  items,
  onDeleteItems,
  onPackItems,
  onClearItems,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  } else if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else {
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onPackItems={onPackItems}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(() => e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value={"packed"}>Sort by packed status</option>
        </select>
        <button onClick={() => onClearItems()}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onPackItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onPackItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        onClick={() => {
          onDeleteItems(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
