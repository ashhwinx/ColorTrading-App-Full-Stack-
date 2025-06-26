import React, { useState, useEffect } from "react";
// import stakeLogo from './'; // Make sure the logo is in your assets folder

const Game = () => {
  const [money, setMoney] = useState(1000);
  var [time, setTime] = useState(15);
  const [winLossUI, setwinLossUI] = useState(false);
  const [boxColor, setBoxColor] = useState(["green", "blue", "red"]);
  const [resultBox, setresultBox] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [userSelected, setUserSelected] = useState("");
  const [compSelected, setCompSelected] = useState("");
  const [betUi, setBetUi] = useState(false);
  const [changeMoney, setChangeMoney] = useState(10);
  const colorClasses = {
    green: "bg-green-900",
    blue: "bg-blue-900",
    red: "bg-red-900",
  };
  // time component-----

  const timeComponent = async () => {
    useEffect(() => {
      const interval = setInterval(() => {
        setTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return 15;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  };
  timeComponent();

  // bet btn p click krne k baad component-----
  const [Uselected, setUselected] = useState("");
  const [Cselected, setCselected] = useState("");
  const bet = (i) => {
    setBetUi(true);

    setUselected(boxColor[i]);

    var random = Math.floor(Math.random() * 3);

    setCselected(boxColor[random]);
  };

  // change monet incraese and dec iss component se honge------------------

  const increase = () => {
    setChangeMoney((prev) => {
      if (prev < money) {
        return prev + 10;
      } else {
        return prev;
      }
    });
  };

  const decrease = () => {
    setChangeMoney((prev) => {
      if (prev > 10) {
        return prev - 10;
      } else {
        return prev;
      }
    });
  };

  const cross = () => {
    setBetUi(false);
  };

  // done and winner choose----------------

  const done = async () => {
    setMoney(money - changeMoney);
    setBetUi(false);
    setUserSelected(Uselected);
    setCompSelected(Cselected);
    if (userSelected == compSelected) {
      win();
    } else {
      lose();
    }
  };
  const [jeetHaarMsg, setJeetHaarMsg] = useState(false);
  const win = () => {
    setJeetHaarMsg(true);
  };
  const lose = () => {
    setJeetHaarMsg(false);
  };

  const tryAgain = () => {
    setwinLossUI(false);
    console.log("chnage money", changeMoney);
    if (jeetHaarMsg) {
      setChangeMoney((prev) => {
        const updated = prev * 2;
        setMoney(money + updated);

        setChangeMoney(10);
      });
    }
  };
  // others-----------------
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (userSelected) {
      if (userSelected == compSelected) {
        win();
      } else {
        lose();
      }
    }
  }, [userSelected]);

  useEffect(() => {
    if (time <= 10) {
      setBetUi(false);
    }
    if (userSelected) {
      {
        if (time == 0) {
          setwinLossUI(true);
        }
      }
      if (time == 0) {
        setresultBox((prev) => {
          const updated = [...prev];
          updated[currentIndex] = Cselected;
          return updated;
        });
        setCurrentIndex((prev) => prev + 1);
        console.log(resultBox)
        setUselected("");
        setCselected("");
        
      }
    }
  }, [time]);

  useEffect(() => {
  console.log("Updated array:", resultBox);
}, [resultBox]);

  return (
    <div className="min-h-screen bg-[#1b2b36] text-white font-sans font-bold">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-2 shadow-md">
        <div className="h-[50px]">
          {/* <img src={stakeLogo} alt="logo" className="h-full" /> */}
        </div>
        <div className="text-xl hover:text-orange-400 cursor-pointer transition-all duration-150">
          ₹{money}
          <i className="fas fa-plus text-base ml-1" id="plus-icon"></i>
        </div>
      </header>

      {/* win lose ui ------------------------------------*/}
      {winLossUI ? (
        <div className="fixed inset-0 z-50 mt-10 bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-80 max-w-full rounded-[30px] shadow-xl p-6 flex flex-col justify-between h-[250px]">
            {/* Red Header */}
            <div
              className={`${
                jeetHaarMsg ? "bg-green-500" : "bg-red-500"
              } text-white font-bold text-xl py-3 rounded-[20px] text-center`}
            >
              {jeetHaarMsg ? "YOU WON" : "YOU LOSE"}
            </div>
            {/* Amount Section */}
            <div
              className={`flex items-center justify-center gap-1 ${
                jeetHaarMsg ? "text-green-500" : "text-red-500"
              } text-4xl font-semibold mt-8`}
            >
              <span>
                {jeetHaarMsg ? "+" : "-"}₹{changeMoney * 2}
              </span>
            </div>

            {/* Try Again Button */}
            <button
              onClick={tryAgain}
              className="bg-black text-white font-semibold py-3 rounded-[20px] w-full mt-6 hover:bg-gray-900 transition"
            >
              try again
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* betUi */}
      {betUi ? (
        <div
          className="fixed mt-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
  w-[210px] h-[266px] bg-[#3e5b71] rounded-xl p-3 flex flex-col items-center justify-between 
  text-white font-bold shadow-xl"
        >
          <div className="text-center text-lg">ORDER AMOUNT</div>

          <button
            onClick={cross}
            className="absolute top-2 right-2 text-white text-lg font-bold hover:text-red-500"
          >
            &times;
          </button>

          <div className="bg-[#1e2b3c] w-full text-center py-2 rounded-md text-xl">
            ₹{changeMoney}
          </div>

          <div className="flex justify-between w-full px-3 gap-4">
            <button
              onClick={increase}
              className="bg-[#1e2b3c] w-1/2 py-2 rounded-md text-2xl hover:bg-[#2a3b4f] transition"
            >
              +
            </button>
            <button
              onClick={decrease}
              className="bg-[#1e2b3c] w-1/2 py-2 rounded-md text-2xl hover:bg-[#2a3b4f] transition"
            >
              -
            </button>
          </div>

          <button
            onClick={done}
            className="bg-[#1e2b3c] w-full py-2 rounded-md mt-2 hover:bg-[#2a3b4f] transition"
          >
            DONE
          </button>
        </div>
      ) : (
        ""
      )}

      {/* Main Container */}
      <div className="flex flex-col items-center justify-center mt-12 px-4">
        <div className="bg-[#203742] rounded-[13px] shadow-lg p-4 w-full max-w-md">
          <h1 className="text-center underline text-2xl mb-4">
            Color Guessing Game
          </h1>

          {/* Timer */}
          <div className="flex justify-between items-center bg-[#1b2b36] px-4 py-2 rounded-[13px] mb-4">
            <div className="text-lg">Time Remaining:</div>
            <div className="text-lg">{time}s</div>
          </div>

          {/* Color Buttons */}
          <div className="flex justify-around items-center mb-4">
            {boxColor.map((color, i) => (
              <div
                key={i}
                onClick={() => bet(i)}
                className={`h-28 w-28 flex justify-center ${
                  time <= 10 ? "pointer-events-none opacity-50" : ""
                } items-center rounded-full border-2 border-black text-lg ${
                  colorClasses[color]
                } cursor-pointer transition-transform hover:scale-105 hover:border-orange-400`}
              >
                {color}
              </div>
            ))}
          </div>
          {/* Result Grid */}
          <div className="flex flex-wrap gap-4 justify-center items-center bg-[#1b2b36] p-6 rounded-[13px]">
            {resultBox.map((value, i) => (
              <div
                key={i}
                className={`w-20 h-20 rounded-full border-2 bg-${value}-500 border-black`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Game;
