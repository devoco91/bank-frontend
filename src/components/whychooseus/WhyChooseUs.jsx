import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './choose.css';
import { FaWallet, FaMoneyCheckAlt, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CardFeature = ({ Icon, title, text, delay }) => (
  <motion.div
    className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    <div className="card feature-card shadow-sm rounded-4 p-3 border-0 text-center">
      <div className="d-flex justify-content-center">
        <Icon className="icon mb-3 text-primary" size={36} />
      </div>
      <h5 className="fw-bold text-dark">{title}</h5>
      <p className="text-muted small">{text}</p>
    </div>
  </motion.div>
);

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us py-5 bg-white">
      <div className="container text-center">
        <h2 className="fw-bold mb-2 text-dark">Why Choose Us</h2>
        <p className="mb-5 text-muted">Here Are The Reason People Choose Us.</p>

        <div className="row g-3">
            
          <CardFeature
            Icon={FaWallet}
            title="Low Transaction Fee"
            text="Unlike others online banking, we stand out because of our low transactions fees, that why we are bank of the people."
            delay={0.1}
          />

          <CardFeature
            Icon={FaMoneyCheckAlt}
            title="Fast Payments"
            text="We are operating on a powerful system, in a blink of an eyes, you payment has been sent to the appropriate reciever."
            delay={0.2}
          />

          <CardFeature
            Icon={FaHeadset}
            title="Dedicated Support Team"
            text="Our workers are always online and available to help you on any issue you might be facing or incase you want to ask questions"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
