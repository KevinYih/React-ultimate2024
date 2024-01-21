export default function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Please add some items to your pakcing list.🚀</em>
      </footer>
    );
  }
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed === true).length;
  const numPercent = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {numPercent === 100
          ? "You got everything! Ready to go ✈️"
          : `👜 You have ${numItems} items on your list, and you already packed
          ${numPacked} (${numPercent} %)`}
      </em>
    </footer>
  );
}
