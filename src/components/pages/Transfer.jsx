import { useEffect } from "react";

import { SendHorizontal } from "lucide-react";

export default function Transfer() {
   useEffect(()=>{
      window.scrollTo(0,0)
    })
  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        <SendHorizontal className="me-2 text-success" /> Transfer Funds
      </h5>
      <form className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">From Account</label>
          <select className="form-select">
            <option>Checking - 5584107612</option>
            <option>Savings - 7890043211</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">To Account</label>
          <input type="text" className="form-control" placeholder="Recipient Account No." />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input type="number" className="form-control" placeholder="$0.00" />
        </div>
        <button className="btn btn-primary">Transfer</button>
      </form>
    </div>
  );
}
