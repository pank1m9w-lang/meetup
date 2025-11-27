import { Calendar, MapPin, Clock } from 'lucide-react';
import './EventDetails.css';

const EventDetails = () => {
  return (
    <section className="event-details-section">
      <div className="event-details-container">
        <h2 className="section-title">イベント詳細</h2>

        <div className="details-grid">
          <div className="detail-card">
            <Calendar className="detail-icon" size={32} />
            <h3>開催日時</h3>
            <p>2025年12月20日（土）<br />10:00〜17:00</p>
          </div>

          <div className="detail-card">
            <MapPin className="detail-icon" size={32} />
            <h3>開催場所</h3>
            <p>岡山大学<br />共育共創コモンズ2階</p>
            <a
              href="https://maps.app.goo.gl/LYtQayQ6ZYmKMeoN6"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              📍 地図を見る
            </a>
          </div>

          <div className="detail-card">
            <Clock className="detail-icon" size={32} />
            <h3>プログラム概要</h3>
            <p>トーク、ワークショップ</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
