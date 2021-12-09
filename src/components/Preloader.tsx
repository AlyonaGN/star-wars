import star from '../images/star.svg';
import wars from '../images/wars.svg';

export const Preloader = () => (
  <div className="preloader">
    <img src={star} alt="Star" className="preloader__star" />
    <img src={wars} alt="Wars" className="preloader__wars" />
    <h2 className="preloader__byline" id="byline">
      The Force Awakens
    </h2>
  </div>
);
