import { useState } from 'react';
import { User, Mail, Phone, Building, MessageSquare, Send } from 'lucide-react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    category: '',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: '申し込みが完了しました！ご登録のメールアドレスに確認メールをお送りします。'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          category: '',
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || '申し込みに失敗しました。もう一度お試しください。'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'サーバーとの通信に失敗しました。もう一度お試しください。'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="registration-section" id="register">
      <div className="registration-container">
        <h2 className="section-title">参加申し込み</h2>
        <p className="section-description">
          下記フォームに必要事項をご記入の上、送信してください。
        </p>

        {status.message && (
          <div className={`status-message ${status.type}`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">
              <User size={20} />
              お名前 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="山田 太郎"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={20} />
              メールアドレス <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <Phone size={20} />
              電話番号
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="090-1234-5678"
            />
          </div>

          <div className="form-group">
            <label htmlFor="organization">
              <Building size={20} />
              所属（学校・会社など）
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="岡山大学"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">
              カテゴリー <span className="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">選択してください</option>
              <option value="高校生">高校生</option>
              <option value="大学生">大学生</option>
              <option value="社会人">社会人</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">
              <MessageSquare size={20} />
              メッセージ・質問など
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="ご質問やご要望などがあればご記入ください"
            ></textarea>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              '送信中...'
            ) : (
              <>
                <Send size={20} />
                申し込む
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
