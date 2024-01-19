import { useState } from "react";

const initialItems = [
  // { id: 1, description: "Passports", quantity: 2, packed: false },
  // { id: 2, description: "Socks", quantity: 12, packed: false },
  // { id: 3, description: "Socks3", quantity: 12, packed: false },
  // { id: 4, description: "Socks4", quantity: 12, packed: true },
  // { id: 5, description: "Socks5", quantity: 12, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  //setFunction must return a items that be changed!

  function handleAddItems(item) {
    setItems((items) => [...items, item]); //items is immutable, We can not use array.
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handlePackItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    //4 sibling components
    // pass a function handleAddItems as a props to Form.
    // pass a property items as a props to PackingList.
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onPackItems={handlePackItems}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴FAR AWAY👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setquantity(1);
  }

  return (
    // form + onSubmit()
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setquantity(() => Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems, onPackItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onPackItems={onPackItems}
            key={item.id}
          />
        ))}
      </ul>
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

function Stats() {
  return (
    <footer className="stats">
      <em>👜 You have X items on your list, and you already packed x (x%)</em>
    </footer>
  );
}
