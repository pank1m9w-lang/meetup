import { Calendar, MapPin, Clock } from 'lucide-react';
import './EventDetails.css';

const EventDetails = () => {
  const schedule = [
    { time: '10:00', content: 'オープニング' },
    { time: '10:30', content: 'トークセッション（高校生・大学生・社会人）' },
    { time: '12:30', content: 'ランチ交流' },
    { time: '14:00', content: 'パフォーマンス' },
    { time: '15:00', content: '交流セッション' },
    { time: '16:30', content: 'クロージング' },
  ];

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
          </div>

          <div className="detail-card">
            <Clock className="detail-icon" size={32} />
            <h3>プログラム概要</h3>
            <p>トーク、ワークショップ</p>
          </div>
        </div>

        <div className="schedule-section">
          <h3 className="schedule-title">タイムテーブル</h3>
          <div className="schedule-list">
            {schedule.map((item, index) => (
              <div key={index} className="schedule-item">
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-content">{item.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
