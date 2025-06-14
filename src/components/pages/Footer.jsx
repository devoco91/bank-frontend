import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-bg pt-5 pb-3 defect">
      <div className="container">
        <div className="row gx-4 gy-4">

          <div className="col-md-4 col-lg-4 col-xl-4">
            <h5 className="mb-2 fw-bold text-nowrap text-white ">SKY WAVES FINANCIAL</h5>
            <p className="small">Banking At Your Service</p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2">
            <h5 className="mb-2 fw-bold text-white ">PRIVACY</h5>
            <ul className="list-unstyled small">
              <li><a href="#" className="footer-link">Ad Agreement</a></li>
              <li><a href="#" className="footer-link">Use Policy</a></li>
              <li><a href="#" className="footer-link">Privacy</a></li>
              <li><a href="#" className="footer-link">Tech Privacy</a></li>
              <li><a href="#" className="footer-link">Dev Terms</a></li>
            </ul>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2">
            <h5 className="mb-2 fw-bold text-white ">NAVIGATE</h5>
            <ul className="list-unstyled small">
              <li><a href="#" className="footer-link">Advertisers</a></li>
              <li><a href="#" className="footer-link">Developers</a></li>
              <li><a href="#" className="footer-link">Resources</a></li>
              <li><a href="#" className="footer-link">Company</a></li>
              <li><a href="#" className="footer-link">Connect</a></li>
            </ul>
          </div>

          <div className="col-md-3 col-lg-3 col-xl-3">
            <h5 className="mb-2 fw-bold text-white ">CONTACT</h5>
            <ul className="list-unstyled small">
              <li>18-03 NJ-208</li>
              <li>Franklin Lakes, NJ</li>
              <li>07417 USA</li>
              <li>+999 90932 627</li>
            </ul>
          </div>

          <div className="col-md-1 col-lg-1 col-xl-1 d-flex align-items-start justify-content-center">
            <div className="text-uppercase small" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              <a href="#top" className="footer-link">Scroll Top</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;






//  <div className="col-md-1 col-lg-1 col-xl-1 d-flex align-items-start justify-content-center">
//             <div className="text-uppercase small" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
//               <a href="#top" className="footer-link">Scroll Top</a>
//             </div>
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;