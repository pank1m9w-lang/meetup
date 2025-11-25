import { MessageCircle, Music, Users } from 'lucide-react';
import './Program.css';

const Program = () => {
  const programs = [
    {
      icon: MessageCircle,
      title: 'トークセッション',
      description: '高校生・大学生・社会人が、それぞれの視点から「挑戦」「未来」「岡山での生き方」について語ります。',
    },
    {
      icon: Music,
      title: 'パフォーマンス',
      description: '岡山ゆかりの若者による音楽・ダンスなど、自分らしい表現を発信。',
    },
    {
      icon: Users,
      title: '交流セッション',
      description: '参加者同士が語り合い、つながる時間。ファシリテーターが入り、初めて同士でも安心。',
    },
  ];

  return (
    <section className="program-section">
      <div className="program-container">
        <h2 className="section-title">プログラム内容</h2>
        <div className="program-grid">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div key={index} className="program-card">
                <div className="program-icon-wrapper">
                  <Icon className="program-icon" size={48} />
                </div>
                <h3 className="program-title">{program.title}</h3>
                <p className="program-description">{program.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Program;
