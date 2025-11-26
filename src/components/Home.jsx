import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <section className="home-section">
      <div className="home-container">
        <h1 className="event-title">
          まだ名前のない<br />
          "あなたの意志"へ。
        </h1>
        <div className="hero-image-container">
          <img src="/Please.svg" alt="Youth Meetup Illustration" className="hero-image" />
        </div>
        <p className="catchphrase">「未来は、ここからつながる。」</p>

        <div className="event-info">
          <div className="info-item">
            <Calendar className="icon" size={24} />
            <span>2025年12月20日（土） 10:00〜17:00</span>
          </div>
          <div className="info-item">
            <MapPin className="icon" size={24} />
            <span>岡山大学 共育共創コモンズ2階</span>
          </div>
        </div>

        <a href="#register" className="cta-button">
          参加する（申込ページへ）
          <ArrowRight className="button-icon" size={20} />
        </a>
      </div>
    </section>
  );
};

export default Home;
