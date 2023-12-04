import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faT} from "@fortawesome/free-solid-svg-icons"
import{faInstagram, faGoogle, faFacebook, faLinkedin} from "@fortawesome/free-brands-svg-icons"
const Footer = () => {
    return ( 
        <>
<footer class="text-center text-lg-start bg-body-tertiary text-muted">
  <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    <div class="me-5 d-none d-lg-block">
      <span>Connect with us on socials:</span>
    </div>

    <div>
      <a href="" className="me-4 text-reset">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="" class="me-4 text-reset">
       <FontAwesomeIcon icon={faInstagram}/>
      </a>
      <a href="" class="me-4 text-reset">
      <FontAwesomeIcon icon={faGoogle}/>
      </a>
      <a href="" class="me-4 text-reset">
      <FontAwesomeIcon icon={faFacebook}/>
      </a>
      <a href="" class="me-4 text-reset">
      <FontAwesomeIcon icon={faLinkedin}/>
      </a>
    </div>
  </section>

  <section class="">
    <div class="container text-center text-md-start mt-5">
      <div class="row mt-3">
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-2">
          <FontAwesomeIcon icon={faT}/>&nbsp;rusted
          </h6>
          <h6 class="text-uppercase fw-bold mb-2">
         <FontAwesomeIcon icon={faT}/>&nbsp;enancys
          </h6>
          <p>
            Check out our helpful links and how we can help secure your next home.
          </p>
        </div>

        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 class="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="#!" class="text-reset">Pricing</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Settings</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Orders</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Help</a>
          </p>
        </div>

        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i class="fas fa-home me-3"></i>Scotland, home of the brave</p>
          <p>
            <i class="fas fa-envelope me-3"></i>
            trustedtenancys@wethebest.com
          </p>
          <p><i class="fas fa-phone me-3"></i> 12345679</p>
        </div>
      </div>
    </div>
  </section>

  <div class="text-center p-4">
    © 2023 Copyright:&nbsp;
    <a class="text-reset fw-bold">TrustedTenancys.com</a>
  </div>
</footer>

        </>
     );
}
 
export default Footer;