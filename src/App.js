import React from "react";
import "./styles.css";

export default function App() {
  const [Check, setCheck] = React.useState(undefined);
  const [Select, setSelect] = React.useState("");
  const [Currency, setCuCy] = React.useState("THB");
  const [Rate, setRate] = React.useState(null);

  React.useEffect(() => {
    fetch("https://lnwcodeapi.ml/latest")
      .then((response) => response.json())
      .then((data) => setCheck(data.response))
      .catch(() => setCheck(null));
    fetch("https://api.exchangerate-api.com/v4/latest/THB")
      .then((response) => response.json())
      .then((data) => setRate(data.rates))
      .catch(() => setRate(null));
  }, []);

  const AutoConvertto = (thaibaht) => {
    return (Rate[Currency] * thaibaht).toFixed(2);
  };

  function com(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="App mt-3">
      <h1>ราคาน้ำมัน</h1>
      {Check != null && Check !== undefined && Rate != null ? (
        <div className="container">
          <p>ประจำวันที่ {Check.date}</p>
          <h6>
            <b>Powered by {Check.note.replace("ผู้พัฒนา", "")}</b>
          </h6>
          <div className="row mt-5">
            <select
              class="col-md-6 form-control"
              defaultValue={Select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option selcted value="">
                ทุกสถานี
              </option>
              {Object.keys(Check.stations).map((stationname) => (
                <option value={stationname}>
                  {stationname.toUpperCase().replace("_", " ")}
                </option>
              ))}
            </select>
            <div className="col-md" />
            <select
              className={
                "col-md-5 form-control" +
                (window.innerWidth < 768 ? " mt-2" : "")
              }
              defaultValue={Currency}
              onChange={(e) => setCuCy(e.target.value)}
            >
              <option value="THB">เลือกอัตราแลกเปลี่ยน (THB)</option>
              <option value="USD">USD</option>
              <option value="AED">AED</option>
              <option value="ARS">ARS</option>
              <option value="AUD">AUD</option>
              <option value="BGN">BGN</option>
              <option value="BRL">BRL</option>
              <option value="BSD">BSD</option>
              <option value="CAD">CAD</option>
              <option value="CHF">CHF</option>
              <option value="CLP">CLP</option>
              <option value="CNY">CNY</option>
              <option value="COP">COP</option>
              <option value="CZK">CZK</option>
              <option value="DKK">DKK</option>
              <option value="DOP">DOP</option>
              <option value="EGP">EGP</option>
              <option value="EUR">EUR</option>
              <option value="FJD">FJD</option>
              <option value="GBP">GBP</option>
              <option value="GTQ">GTQ</option>
              <option value="HKD">HKD</option>
              <option value="HRK">HRK</option>
              <option value="HUF">HUF</option>
              <option value="IDR">IDR</option>
              <option value="ILS">ILS</option>
              <option value="INR">INR</option>
              <option value="ISK">ISK</option>
              <option value="JPY">JPY</option>
              <option value="KRW">KRW</option>
              <option value="KZT">KZT</option>
              <option value="MVR">MVR</option>
              <option value="MXN">MXN</option>
              <option value="MYR">MYR</option>
              <option value="NOK">NOK</option>
              <option value="NZD">NZD</option>
              <option value="PAB">PAB</option>
              <option value="PEN">PEN</option>
              <option value="PHP">PHP</option>
              <option value="PKR">PKR</option>
              <option value="PLN">PLN</option>
              <option value="PYG">PYG</option>
              <option value="RON">RON</option>
              <option value="RUB">RUB</option>
              <option value="SAR">SAR</option>
              <option value="SEK">SEK</option>
              <option value="SGD">SGD</option>
              <option value="TRY">TRY</option>
              <option value="TWD">TWD</option>
              <option value="UAH">UAH</option>
              <option value="UYU">UYU</option>
              <option value="ZAR">ZAR</option>
            </select>
          </div>

          {Currency !== "THB" && (
            <h5 className="border border-info mt-2 p-2">
              1 บาทไทย ≈ {Rate[Currency] + " " + Currency}
            </h5>
          )}
          <hr />
          {Select === "" ? (
            Object.keys(Check.stations).map((stationname, i) => (
              <div key={stationname}>
                <h3 className="mt-5 ml-2 text-left">
                  {Select === ""
                    ? stationname.toUpperCase().replace("_", " ")
                    : Select.toUpperCase().replace("_", " ")}
                </h3>

                <table
                  className={
                    "table text-left" +
                    (i === Object.keys(Check.stations).length - 1
                      ? " mb-5"
                      : "")
                  }
                >
                  <thead className="pl-3 pr-3 thead-light text-center">
                    <tr>
                      <th scope="col" className="align-middle">
                        ลำดับ
                      </th>
                      <th scope="col" className="align-middle">
                        ประเภทน้ำมัน
                      </th>
                      <th scope="col" className="align-middle">
                        ราคา
                        <br />({Currency} per liter)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(Check.stations[stationname]).map(
                      (oiltype, i) =>
                        Check.stations[stationname][oiltype].name !== "" &&
                        Check.stations[stationname][oiltype].price !== "" && (
                          <tr key={stationname + oiltype}>
                            <th scope="row">{i + 1}</th>
                            <td>{Check.stations[stationname][oiltype].name}</td>
                            <td className="text-right">
                              {Currency === "THB"
                                ? com(
                                    parseFloat(
                                      Check.stations[stationname][oiltype].price
                                    )
                                  )
                                : com(
                                    AutoConvertto(
                                      parseFloat(
                                        Check.stations[stationname][oiltype]
                                          .price
                                      )
                                    )
                                  )}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
                {i !== Object.keys(Check.stations).length - 1 && <hr />}
              </div>
            ))
          ) : (
            <div key={Select}>
              <h3 className="mt-5 ml-2 text-left">
                {Select.toUpperCase().replace("_", " ")}
              </h3>

              <table className="table text-left mb-5">
                <thead className="pl-3 pr-3 thead-light text-center">
                  <tr>
                    <th scope="col" className="align-middle">
                      ลำดับ
                    </th>
                    <th scope="col" className="align-middle">
                      ประเภทน้ำมัน
                    </th>
                    <th scope="col" className="align-middle">
                      ราคา
                      <br />({Currency} per liter)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(Check.stations[Select]).map(
                    (oiltype, i) =>
                      Check.stations[Select][oiltype].name !== "" &&
                      Check.stations[Select][oiltype].price !== "" && (
                        <tr key={Select + oiltype}>
                          <th scope="row">{i + 1}</th>
                          <td>{Check.stations[Select][oiltype].name}</td>
                          <td className="text-right">
                            {Currency === "THB"
                              ? com(
                                  parseFloat(
                                    Check.stations[Select][oiltype].price
                                  )
                                )
                              : com(
                                  AutoConvertto(
                                    parseFloat(
                                      Check.stations[Select][oiltype].price
                                    )
                                  )
                                )}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : Check == null && Check !== undefined ? (
        <h2>ไม่พบข้อมูล</h2>
      ) : (
        <h3 className="mt-5"><img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="40"/> กำลังตรวจสอบ...</h3>
      )}
    </div>
  );
}
