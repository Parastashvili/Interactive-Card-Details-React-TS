import "./App.css";
import CardBack from "./asset/images/bg-card-back.png";
import CardFront from "./asset/images/bg-card-front.png";
import CardLogo from "./asset/images/card-logo.svg";
import ConfirmationLogo from "./asset/images/icon-complete.svg";
import { useState } from "react";

function App(): JSX.Element {
  const [card, setCard] = useState<boolean>(false);
  const [name, setName] = useState<string>("NAME SURNAME");
  const [date, setDate] = useState<string>("00/00");
  const [cardNum, setCardNum] = useState<string>("0000 0000 0000 0000");
  const [cvc, setCvc] = useState<string>("000");
  const [inputNameValue, setInputNameValue] = useState<string>("");
  const [inputNumberValue, setInputNumberValue] = useState<string>("");
  const [inputMonthValue, setInputMonthValue] = useState<String>("");
  const [inputYearValue, setInputYearValue] = useState<string>("");
  const [inputCvcValue, setInputCvcValue] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "cardName") {
      setInputNameValue(event.target.value);
      if (event.target.value != "") {
        document.documentElement.style.setProperty("--name", "00FFFFFF");
      }
    } else if (event.target.id === "cardNumber") {
      setInputNumberValue(event.target.value);
      if (event.target.value.length == 16) {
        document.documentElement.style.setProperty("--cardNum", "00FFFFFF");
      }
    } else if (event.target.id === "month") {
      setInputMonthValue(event.target.value);
      if (event.target.value < "13" || event.target.value > "0") {
        document.documentElement.style.setProperty("--month", "00FFFFFF");
      }
    } else if (event.target.id === "year") {
      if (event.target.value < "34" || event.target.value > "22") {
        document.documentElement.style.setProperty("--year", "00FFFFFF");
      }
      setInputYearValue(event.target.value);
    } else if (event.target.id === "cvc") {
      setInputCvcValue(event.target.value);
      if (event.target.value.length == 3) {
        document.documentElement.style.setProperty("--cvc", "00FFFFFF");
      }
    }
  };
  let indicator: number;
  const checkInputs = () => {
    indicator = 0;
    if (inputNameValue == "") {
      document.documentElement.style.setProperty("--name", "#FF0000");
    } else {
      indicator++;
    }
    if (inputNumberValue.length != 16) {
      document.documentElement.style.setProperty("--cardNum", "#FF0000");
    } else {
      indicator++;
    }
    if (inputMonthValue > "12" || inputMonthValue < "1") {
      document.documentElement.style.setProperty("--month", "#FF0000");
    } else {
      indicator++;
    }
    if (inputYearValue > "33" || inputYearValue < "23") {
      document.documentElement.style.setProperty("--year", "#FF0000");
    } else {
      indicator++;
    }
    if (inputCvcValue.length != 3) {
      document.documentElement.style.setProperty("--cvc", "#FF0000");
    } else {
      indicator++;
    }
  };
  const handler = () => {
    checkInputs();
    if (indicator == 5) {
      setName(inputNameValue);
      const pattern = /\d{4}/g;
      const splitString: any = inputNumberValue.match(pattern)?.join(" ");
      setCardNum(splitString);
      const date: string = `${inputMonthValue + "/" + inputYearValue}`;
      setDate(date);
      setCvc(inputCvcValue);
      setCard(true);
    } else {
      alert(
        "Please indicate correct information in the field with red outline color"
      );
    }
  };
  const restarter = () => {
    window.location.reload();
  };
  return (
    <div className="outerCont">
      <div className="header">
        <div className="cardContainer">
          <img
            className="cardSize cardBack"
            src={CardBack}
            alt="Card Background"
          />
          <p className="cvcNumber">{cvc}</p>
          <img
            className="cardSize cardFront"
            src={CardFront}
            alt="Card Frontend"
          />
          <img className="cardLogo" src={CardLogo} alt="Card Logo" />
          <h2 className="cardNumber">{cardNum}</h2>
          <div className="cardNameDateCont">
            <h3 className="cardNameDate cardName">{name}</h3>
            <h4 className="cardNameDate cardDate">{date}</h4>
          </div>
        </div>
      </div>
      {card ? (
        <div className="confirmation">
          <img
            className="completeLogo"
            src={ConfirmationLogo}
            alt="Card added"
          />
          <h2 className="thankTxt1">THANK YOU!</h2>
          <p className="thankTxt2">We’ve added your card details</p>
          <button onClick={restarter} className="restart">
            Continue
          </button>
        </div>
      ) : (
        <div>
          <div className="inputContOuter">
            <div className="inputContInner">
              <h5 className="cardDetail">Cardholder Name</h5>
              <input
                onChange={handleInputChange}
                id="cardName"
                className="inputNameNumber"
                type="text"
                placeholder="e.g. Jane Appleseed"
              />
              <p id="nameWarning" className="warningText">
                Can’t be blank
              </p>
            </div>
            <div className="inputContInner">
              <h5 className="cardDetail">Card Number</h5>
              <input
                onChange={handleInputChange}
                id="cardNumber"
                className="inputNameNumber"
                type="Number"
                minLength={16}
                maxLength={16}
                placeholder="e.g. 1234 5678 9123 0000"
              />
              <p id="numberWarning" className="warningText">
                Check format, only 16 digit number
              </p>
            </div>
            <div className="inputContInnerB">
              <div className="bottomInner">
                <div className="month">
                  <p className="cardDetail">Exp. Date</p>
                  <input
                    onChange={handleInputChange}
                    id="month"
                    className="inputNameNumber addition"
                    type="Number"
                    min={1}
                    max={12}
                    placeholder="MM"
                  />
                  <p id="monthWarning" className="warningText">
                    Can’t be blank
                  </p>
                </div>
                <div className="year">
                  <p className="cardDetail">(MM/YY)</p>
                  <input
                    onChange={handleInputChange}
                    id="year"
                    className="inputNameNumber addition"
                    type="Number"
                    min={23}
                    max={33}
                    placeholder="YY"
                  />
                  <p id="yearWarning" className="warningText">
                    Can’t be blank
                  </p>
                </div>
                <div className="cvc">
                  <p className="cardDetail">CVC</p>
                  <input
                    onChange={handleInputChange}
                    id="cvc"
                    className="inputNameNumber addition"
                    type="Number"
                    placeholder="e.g. 123"
                    minLength={3}
                    maxLength={3}
                    min={0}
                    max={999}
                  />
                  <p id="cvcWarning" className="warningText">
                    Can’t be blank
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="buttonCont">
            <button onClick={handler} className="createBTN">
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
