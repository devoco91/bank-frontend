import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './hero.css';
import HERO from '../../assets/hero-img.png';

const rotatingWords = ['Easy way', 'Less time', 'Lowest fee'];

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(rotatingWords[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentWord(rotatingWords[index]);
  }, [index]);

  return (
    <div className="hero-section d-flex align-items-center text-white">
      <div className="container">
        <div className="row ">
          <div className="col-md-6 ">
            <p className="trusted">Trusted Online Payment Platform</p>
            <h4 className="fw-bold">
              Transfer Money Across World
              <br />
              In Real Time With <span className="rotating-word">{currentWord}</span>
            </h4>
            <p className=" text-light fw-normal mt-4">
              We work with you to protect your account information. Under our Security Guarantee,
              we will fully reimburse you for unauthorized transactions conducted in your personal
              accounts through SKY WAVES FINANCIAL Online banking if you have met your security responsibilities.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src={HERO}
              alt="Mobile Pay Illustration"
              className="img-fluid hero-illustration hero-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
