import { Children, useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(2);
  //Only here can allow to use useState funciton here. next to App()
  //setStep function tied to the step variable.
  const [isOpen, setIsOpen] = useState(true);

  //const [test, setTest] = useState({ name: "KK" });
  //do not use setTest function. test is a object. useState define the 1st property.

  function handlPrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
    //step = step + 1;   can not work
  }

  return (
    <>
      <button
        className="close"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          {/* <p className="message">
            <h3>Step {step}</h3>
            {messages[step - 1]}
          </p> */}

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button
              onClick={() => handlPrevious()}
              bgColor="#7950f2"
              textColor="#fff"
            >
              🫲Previous
            </Button>
            {/* {Children props} */}
            <Button onClick={handleNext} bgColor={"#7950f2"} textColor={"#fff"}>
              Previous🫱
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

// children is previously defined reserved keyword
function Button({ onClick, bgColor, textColor, children }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </button>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}
