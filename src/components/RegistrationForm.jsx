import { useState } from 'react';
import { User, Mail, Phone, Building, MessageSquare, Send, UserPlus, X, Camera } from 'lucide-react';
import SuccessModal from './SuccessModal';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    category: '',
    message: '',
    photoConsent: true
  });

  const [additionalMembers, setAdditionalMembers] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addMember = () => {
    setAdditionalMembers([...additionalMembers, { name: '' }]);
  };

  const removeMember = (index) => {
    setAdditionalMembers(additionalMembers.filter((_, i) => i !== index));
  };

  const updateMember = (index, field, value) => {
    const updated = additionalMembers.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    setAdditionalMembers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const submissionData = {
        ...formData,
        additionalMembers: additionalMembers
      };

      console.log('Submitting form data:', submissionData);

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      console.log('Response status:', response.status);

      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        throw new Error('サーバーからの応答が不正です');
      }

      if (response.ok) {
        // 成功時はモーダルを表示
        setSubmittedName(formData.name);
        setShowSuccessModal(true);

        // フォームをリセット
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          category: '',
          message: '',
          photoConsent: true
        });
        setAdditionalMembers([]);

        // ステータスメッセージはクリア
        setStatus({ type: '', message: '' });
      } else {
        const errorMessage = data.error ||
          (response.status === 409 ? 'このメールアドレスは既に登録されています。' :
           response.status === 500 ? 'サーバーエラーが発生しました。時間をおいて再度お試しください。' :
           '申し込みに失敗しました。入力内容をご確認ください。');

        setStatus({
          type: 'error',
          message: errorMessage
        });
        console.error('Server error:', data);
      }
    } catch (error) {
      console.error('Submit error:', error);

      let errorMessage = 'サーバーとの通信に失敗しました。';

      if (error.message.includes('fetch')) {
        errorMessage = 'ネットワークエラー: インターネット接続を確認してください。';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setStatus({
        type: 'error',
        message: errorMessage + ' 問題が続く場合は、運営までお問い合わせください。'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        name={submittedName}
      />

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

          <div className="form-group photo-consent-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="photoConsent"
                checked={formData.photoConsent}
                onChange={handleChange}
              />
              <Camera size={20} />
              <span>イベント中の写真撮影・SNS等への掲載に同意します</span>
            </label>
            <p className="form-note">
              ※イベントの様子を撮影し、SNSやWebサイトに掲載させていただく場合があります。
            </p>
          </div>

          <div className="additional-members-section">
            <div className="section-header">
              <h4>
                <UserPlus size={20} />
                参加メンバーの追加（任意）
              </h4>
              <button
                type="button"
                className="add-member-button"
                onClick={addMember}
              >
                <UserPlus size={18} />
                メンバーを追加
              </button>
            </div>
            <p className="form-note">
              ご友人やグループで参加される場合は、メンバー情報を追加してください。
            </p>

            {additionalMembers.map((member, index) => (
              <div key={index} className="member-card">
                <div className="member-header">
                  <span className="member-number">メンバー {index + 1}</span>
                  <button
                    type="button"
                    className="remove-member-button"
                    onClick={() => removeMember(index)}
                    aria-label="削除"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="member-fields">
                  <input
                    type="text"
                    placeholder="お名前"
                    value={member.name}
                    onChange={(e) => updateMember(index, 'name', e.target.value)}
                    className="member-input"
                  />
                </div>
              </div>
            ))}
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
    </>
  );
};

export default RegistrationForm;
