import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  function handleClearItems() {
    const confirmed = window.confirm("Are you confirm?");
    if (confirmed) setItems([]);
  }

  function handleNumItems() {
    return items.length;
  }
  console.log(handleNumItems());

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
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
