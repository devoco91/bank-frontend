import React,{useEffect} from "react";
import { Settings, Lock, Bell, User } from "lucide-react";

export default function SettingsPage() {

 useEffect(()=>{
    window.scrollTo(0,0)
  })

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        <Settings className="me-2 text-info" /> Settings
      </h5>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h6 className="text-muted mb-3"><User className="me-2" /> Profile</h6>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" defaultValue="Williams Chandler" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" defaultValue="williamschandler@gmail.com" />
              </div>
              <button className="btn btn-primary">Save Changes</button>
            </form>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h6 className="text-muted mb-3"><Lock className="me-2" /> Security</h6>
            <form>
              <div className="mb-3">
                <label className="form-label">Current Password</label>
                <input type="password" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input type="password" className="form-control" />
              </div>
              <button className="btn btn-outline-danger">Update Password</button>
            </form>
          </div>
        </div>

        <div className="col-12">
          <div className="card p-4 shadow-sm">
            <h6 className="text-muted mb-3"><Bell className="me-2" /> Notification Preferences</h6>
            <form>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="emailAlerts" defaultChecked />
                <label className="form-check-label" htmlFor="emailAlerts">
                  Email Alerts for Transactions
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="smsAlerts" />
                <label className="form-check-label" htmlFor="smsAlerts">
                  SMS Notifications
                </label>
              </div>
              <button className="btn btn-success mt-3">Save Preferences</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
