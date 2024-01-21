import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

//we can not use class, which is a reserved key word in JS.
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  ); //each component an only return exactly one element.
}

function Header() {
  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;

  return (
    // 数组中需要将key 直接添加给 forEach， map 或 for 循环直接控制的元素。
    <main className="menu">
      <h2>Our menu</h2>

      {numPizzas > 0 ? (
        <>
          {/*react fragment*/}
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later.</p>
      )}

      {/* name={pizza.name}
          ingredients={pizza.ingredients}
          photoName={pizza.photoName}
          price={pizza.price} */}

      {/* <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price="10"
      />
      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mushrooms"
        photoName="pizzas/funghi.jpg"
        price={12}
      /> */}
    </main>
  );
}
//function Pizza(props)  === function Pizza({pizzaObj})  , props === {pizzaObj}
function Pizza({ pizzaObj, key }) {
  //if (pizzaObj.soldOut) return null; //so beautiful. only one return can be allowed!!
  return (
    <li className={pizzaObj.soldOut ? "pizza sold-out" : "pizza"}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        {/* {pizzaObj.soldOut ? (
          <span>SOLD OUT</span>
        ) : (
          <span>{Number(pizzaObj.price)}</span>
        )} */}
        <span>{pizzaObj.soldOut ? "SOLD OUT" : Number(pizzaObj.price)}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 0;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  // if (hour >= 12 && hour <= 22) {
  //   alert("We're open!");
  // } else {
  //   alert("We're closed!");
  // }

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <div className="order">
          <p>{new Date().toLocaleTimeString()}</p>
          <p>
            We're happy to welcome you between {openHour}:00 and {closeHour}:00.
          </p>
        </div>
      )}
    </footer>
  );
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>{new Date().toLocaleTimeString()}</p>
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React before v18
//React.render(<App />, document.getElementById("root"));
