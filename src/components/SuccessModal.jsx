import { CheckCircle, X } from 'lucide-react';
import './SuccessModal.css';

const SuccessModal = ({ isOpen, onClose, name }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="閉じる">
          <X size={24} />
        </button>

        <div className="modal-icon">
          <CheckCircle size={80} />
        </div>

        <h2 className="modal-title">ご応募ありがとうございます！</h2>

        <p className="modal-message">
          {name && <span className="modal-name">{name}様</span>}
          <br />
          参加申し込みを受け付けました。
        </p>

        <div className="modal-details">
          <p>📧 ご登録いただいたメールアドレスに確認メールをお送りしました。</p>
          <p>📅 イベント当日のご参加をお待ちしております！</p>
        </div>

        <button className="modal-button" onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
