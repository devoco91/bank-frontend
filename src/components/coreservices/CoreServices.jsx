import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import S1 from '../../assets/s1.png';
import S2 from '../../assets/s2.png';
import S3 from '../../assets/s3.png';
import S4 from '../../assets/s4.png';
import S5 from '../../assets/s5.png';
import S6 from '../../assets/s6.png';
import '../../components/global/growth.css';

const services = [
  { img: S1, title: 'Secure Payment Service', text: 'Our data encryption to help ensure that your information can only be decoded and read by our secure online and...' },
  { img: S2, title: 'Tax Consulting', text: 'We Have professionals extensive experience and are proactive in determining appropriate tax strategies...' },
  { img: S3, title: 'Low Cost and Fast transfer', text: 'Our Money Transfer service allows customers to transfer funds to all any beneficiary in another country in a...' },
  { img: S4, title: 'Mobile Banking & Payment', text: 'Our Internet Banking is best viewed with Internet Explorer Version 11.0, Chrome 38, Firefox 33 and Safari 5 with a resolution of 1024 x 768 and higher.' },
  { img: S5, title: 'Pay Bills', text: 'Quick Pay is the easiest and the smartest way to pay your utility bills such as Electricity, Gas, Insurance, Telecom, Products and Services etc.' },
  { img: S6, title: 'Online Marketplace', text: 'We are the one-stop shop solution for all your payments needs - we have over 200 plus billers for you to choose from and make payments.' }
];

export default function CoreServices() {
  return (
    <div className="bg-light">
      <section className="text-center text-white py-5" style={{ backgroundColor: '#0a3d91' }}>
        <div className="container">
          <p className="text-uppercase text-info mb-1">Our Services</p>
          <h4 className="mb-3">Our Core Services</h4>
          <p className="mb-5" style={{ fontSize: '12px', color: '#c4c4c4' }}>All our services are reliable anytime anywhere 2/4/7.</p>

          <div className="row growth d-none d-md-flex">
            {services.map((srv, i) => (
              <motion.div
                key={i}
                className="col-md-4 mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <div className="bg-white text-dark rounded p-4 h-100 shadow-sm">
                  <div className="mb-3">
                    <motion.img
                      src={srv.img}
                      alt="icon"
                      className="img-fluid p-2 rounded-circle"
                      style={{ maxHeight: '60px', backgroundColor: '#eef3ff' }}
                      whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(124, 112, 255, 0.8)" }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  </div>
                  <h6 className="fw-bold">{srv.title}</h6>
                  <p className="mb-0">{srv.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Swiper for mobile view */}
          <div className="d-md-none">
            <Swiper
              spaceBetween={20}
              slidesPerView={1.1}
              pagination={{ clickable: true }}
              modules={[Pagination]}
            >
              {services.map((srv, i) => (
                <SwiperSlide key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    className="bg-white text-dark rounded p-4 shadow-sm mx-2"
                  >
                    <div className="mb-3 text-center">
                      <motion.img
                        src={srv.img}
                        alt="icon"
                        className="img-fluid p-2 rounded-circle"
                        style={{ maxHeight: '60px', backgroundColor: '#eef3ff' }}
                        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(124, 112, 255, 0.8)" }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      />
                    </div>
                    <h6 className="fw-bold text-center">{srv.title}</h6>
                    <p className="mb-0 text-center" style={{ fontSize: '13px' }}>{srv.text}</p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>
    </div>
  );
}
