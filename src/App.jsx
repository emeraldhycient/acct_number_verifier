import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [detail, setdetail] = useState([]);
  const [banklist, setbanklist] = useState("");
  const [acct, setacct] = useState("");
  const [code, setcode] = useState("");

  const handleverify = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("acct", acct);
    formdata.append("code", code);

    axios
      .post("http://bia-investment.com/verify.php", formdata)
      .then((res) => {
        if (res.data.status) {
          setdetail(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });

    return false;
  };

  const getBanks = () => {
    axios
      .get("http://bia-investment.com/getbanks.php")
      .then((res) => {
        if (res.data.status) {
          setbanklist(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    getBanks();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="col-md-6 card mx-auto py-3 mt-5">
          <div className="bg-success text-center my-2">
            <h6 className="text-light">{detail.account_name}</h6>
          </div>
          <form action="" className="form-group" onSubmit={handleverify}>
            <input
              type="number"
              name=""
              id=""
              placeholder="enter account number"
              className="form-control mb-2"
              value={acct}
              onChange={(e) => setacct(e.target.value)}
              required
            />
            <select
              className="form-control"
              value={code}
              onChange={(e) => setcode(e.target.value)}
              required
            >
              <option value="">select bank</option>
              {banklist
                ? banklist.map((bank, index) => (
                    <option value={bank.code} key={index}>
                      {bank.name}
                    </option>
                  ))
                : ""}
            </select>
            <button className="btn btn-success mt-3 float-right">
              Verify account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
