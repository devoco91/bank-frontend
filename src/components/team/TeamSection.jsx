import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import M1 from '../../assets/m1.png';
import M2 from '../../assets/m2.png';
import M3 from '../../assets/m3.png';
import M4 from '../../assets/m4.png';

const teamMembers = [
  { name: "Randy Crishen", title: "Company CEO", image: M1 },
  { name: "Monica Ashker", title: "Web Designer", image: M2 },
  { name: "Tollay Ramzomi", title: "Web Developer", image: M3 },
  { name: "Jacke Wilson", title: "Marketing Specialist", image: M4 },
];

const directions = [
  { x: -50, y: 0 },
  { x: 0, y: 50 },
  { x: 50, y: 0 },
  { x: 0, y: -50 }
];

export default function TeamSection() {
  return (
    <div className="text-center py-5 bg-white">
      <h5 className="text-primary">Our Creative Team</h5>
      <h4 className="mb-5">Our Awesome Team</h4>
      <div className="container">
        <div className="row justify-content-center">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              className="col-12 col-sm-6 col-md-3 d-flex justify-content-center mb-4"
              initial={{ opacity: 0, ...directions[idx % directions.length] }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              exit={{ opacity: 0 }}
            >
              <div className="rounded-4 p-3 text-center shadow-sm" style={{ border: "2px solid #8a6cff" }}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-circle mx-auto position-relative border border-primary border-4 p-1"
                  style={{ width: 140, height: 140, borderStyle: "dotted" }}
                >
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="rounded-circle w-100 h-100 object-fit-cover"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <h6 className="mt-3" style={{ fontSize: '20px' }}>{member.name}</h6>
                  <hr className="mx-auto" style={{ width: "50px", height: "2px", background: "#c7a36f" }} />
                  <p className="text-muted m-0" style={{ fontSize: '17px' }}>{member.title}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
