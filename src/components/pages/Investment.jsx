import React,{useEffect} from "react";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 280000 },
  { name: "Feb", value: 290000 },
  { name: "Mar", value: 300000 },
  { name: "Apr", value: 310000 },
  { name: "May", value: 320000 },
];

export default function Investment() {
 useEffect(()=>{
    window.scrollTo(0,0)
  })

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        <TrendingUp className="me-2 text-success" /> Investment Overview
      </h5>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Total Portfolio Value</h6>
              <h5 className="text-success fw-bold">$320,000</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Profit / Loss</h6>
              <h5 className="text-dark fw-bold">+$12,500 (4%)</h5>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card shadow-sm p-3">
            <h6 className="mb-3 text-muted">Performance Over Time</h6>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#28c76f" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
