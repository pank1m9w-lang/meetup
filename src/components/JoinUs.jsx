import { FileText, Ticket, MapPin, ExternalLink } from 'lucide-react';
import './JoinUs.css';

const JoinUs = () => {
  return (
    <section className="joinus-section">
      <div className="joinus-container">
        <h2 className="section-title">参加方法・アクセス</h2>

        <div className="joinus-grid">
          <div className="joinus-card">
            <FileText className="joinus-icon" size={40} />
            <h3>参加方法</h3>
            <p>申込フォーム or Peatix</p>
            <a href="#register" className="joinus-button">
              申し込む
              <ExternalLink size={18} />
            </a>
          </div>

          <div className="joinus-card">
            <Ticket className="joinus-icon" size={40} />
            <h3>チケット</h3>
            <p>無料 / 有料（後日公開）</p>
          </div>

          <div className="joinus-card">
            <MapPin className="joinus-icon" size={40} />
            <h3>会場アクセス</h3>
            <p>岡山大学 共育共創コモンズ2階</p>
            <a
              href="https://maps.app.goo.gl/LYtQayQ6ZYmKMeoN6"
              target="_blank"
              rel="noopener noreferrer"
              className="joinus-button"
            >
              地図を見る
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        <div className="access-info">
          <h3>公共交通機関でのアクセス</h3>
          <ul>
            <li>JR岡山駅からバスで約20分</li>
            <li>岡山駅西口バスターミナルより岡山大学方面行きバス乗車</li>
            <li>「岡大西門」または「岡大正門」下車、徒歩5分</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
