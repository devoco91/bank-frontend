import React, {useEffect} from "react";
import { CreditCard, Lock, RefreshCw, BarChart2 } from "lucide-react";

export default function Card() {

   useEffect(()=>{
      window.scrollTo(0,0)
    })
  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        <CreditCard className="me-2 text-primary" /> My Cards
      </h5>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h6 className="text-muted">Primary Card</h6>
            <div className="border rounded p-3 bg-dark text-white mb-3">
              **** **** **** 1234 <br /> Exp: 12/28
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-danger"><Lock size={16} className="me-1" /> Freeze</button>
              <button className="btn btn-outline-primary"><RefreshCw size={16} className="me-1" /> Replace</button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h6 className="text-muted">Spending Summary</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Food & Dining <span>$1,200</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Travel <span>$850</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Shopping <span>$1,050</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Bills <span>$600</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}