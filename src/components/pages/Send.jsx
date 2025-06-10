import { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Modal, Spinner } from "react-bootstrap";

export default function SendPage() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(true);
    }, 1500);
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setShowCardModal(false);
      setShowModal(true);
    }, 1500);
  };

  return (
    <div className="container-fluid py-4 min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <div className="w-100 px-2 px-sm-4" style={{ maxWidth: 500 }}>
        <div className="text-center mb-4">
          <SendHorizontal size={40} className="text-success mb-2" />
          <h4 className="fw-bold">Send Money Securely</h4>
          <p className="text-muted small">Initiate a secure transaction to any account</p>
        </div>

        <form className="bg-white shadow rounded p-3 p-sm-4" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <select className="form-select" id="fromAccount">
              <option>Checking - 5584107612</option>
              <option>Savings - 7890043211</option>
            </select>
            <label htmlFor="fromAccount">From Account</label>
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="toAccount" placeholder="Recipient Account No." required />
            <label htmlFor="toAccount">To Account</label>
          </div>

          <div className="form-floating mb-3">
            <input type="number" className="form-control" id="amount" placeholder="$0.00" required />
            <label htmlFor="amount">Amount</label>
          </div>

          <button className="btn btn-success w-100" disabled={isSubmitting}>
            {isSubmitting ? <div className="spinner-grow spinner-grow-sm" role="status" /> : 'Send Transfer'}
          </button>
        </form>

        <div className="text-center mt-3">
          <button className="btn btn-outline-primary w-100" onClick={() => setShowCardModal(true)}>
            Other Payment Options
          </button>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Transaction Blocked</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-1">Transaction cannot be completed at this time.</p>
          <small className="text-muted">A service fee must be paid to proceed.</small>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary w-100" onClick={() => setShowModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCardModal} onHide={() => setShowCardModal(false)} centered>
        <form onSubmit={handlePay} className="card p-3 border-0">
          <Modal.Header closeButton>
            <Modal.Title>Pay With Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" placeholder="0000 0000 0000 0000" required />
              <label>Card Number</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" className="form-control" placeholder="Full Name" required />
              <label>Name on Card</label>
            </div>
            <div className="row g-2">
              <div className="col-12 col-sm-6">
                <div className="form-floating">
                  <input type="text" className="form-control" placeholder="MM/YY" required />
                  <label>Expiry</label>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-floating">
                  <input type="text" className="form-control" placeholder="CVV" required />
                  <label>CVV</label>
                </div>
              </div>
            </div>
            <div className="form-floating mt-3">
              <input type="password" className="form-control" placeholder="PIN" required />
              <label>PIN</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-success w-100" type="submit" disabled={isPaying}>
              {isPaying ? <div className="spinner-border spinner-border-sm" role="status" /> : 'Pay Now'}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
