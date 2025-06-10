import { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Modal, Spinner } from "react-bootstrap";

export default function Transfer() {
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
    }, 2000);
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setShowCardModal(false);
      setShowModal(true);
    }, 2000);
  };

  return (
    <div className="container py-4">
      <h5 className="fw-bold mb-4 d-flex align-items-center flex-wrap">
        <SendHorizontal className="me-2 text-success" /> Transfer Funds
      </h5>

      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">From Account</label>
          <select className="form-select">
            <option>Checking - 8632107640</option>
            <option>Savings - 7890043211</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">To Account</label>
          <input
            type="text"
            className="form-control"
            placeholder="Recipient Account No."
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            placeholder="$0.00"
            required
          />
        </div>

        <button className="btn btn-primary w-100" disabled={isSubmitting}>
          {isSubmitting ? <Spinner size="sm" animation="border" /> : 'Transfer'}
        </button>
      </form>

      {/* Transaction Error Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Transaction cannot be completed at this time. A certain fee needs to be paid to proceed.
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column flex-sm-row gap-2">
          <button className="btn btn-outline-primary w-100" onClick={() => { setShowModal(false); setShowCardModal(true); }}>
            Pay Using Card
          </button>
          <button className="btn btn-secondary w-100" onClick={() => setShowModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      {/* Pay Using Card Modal */}
      <Modal show={showCardModal} onHide={() => setShowCardModal(false)} centered>
        <form onSubmit={handlePay} className="card p-3 border-0">
          <Modal.Header closeButton>
            <Modal.Title>Pay with Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input type="text" className="form-control" placeholder="0000 0000 0000 0000" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Name on Card</label>
              <input type="text" className="form-control" placeholder="Full Name" required />
            </div>
            <div className="row g-2">
              <div className="col-6">
                <label className="form-label">Expiry Date</label>
                <input type="text" className="form-control" placeholder="MM/YY" required />
              </div>
              <div className="col-6">
                <label className="form-label">CVV</label>
                <input type="text" className="form-control" placeholder="123" required />
              </div>
            </div>
            <div className="mt-3">
              <label className="form-label">PIN</label>
              <input type="password" className="form-control" placeholder="****" required />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary w-100" type="submit" disabled={isPaying}>
              {isPaying ? <Spinner size="sm" animation="border" /> : 'Pay Now'}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
