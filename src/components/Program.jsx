import { MessageCircle, Lightbulb, PartyPopper } from 'lucide-react';
import './Program.css';

const Program = () => {
  const programs = [
    {
      icon: MessageCircle,
      title: 'トークセッション',
      description: '高校生・大学生・社会人が、それぞれの視点から「挑戦」「未来」「岡山での生き方」について語ります。',
    },
    {
      icon: Lightbulb,
      title: 'ワークショップ',
      description: '参加者が主体的に学び、体験する実践型プログラム。グループワークを通じて新しい気づきを得られます。',
    },
    {
      icon: PartyPopper,
      title: 'アフターパーティ',
      description: 'イベント終了後、参加者同士が気軽に交流できる時間。リラックスした雰囲気でつながりを深めます。',
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
