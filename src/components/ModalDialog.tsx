import "./ModalDialog.css";

interface ModalDialogProps {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ModalDialog({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText = "Cancel",
}: ModalDialogProps) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {title && <h2>{title}</h2>}
        <p>{message}</p>
        <div className="dialog-buttons">
          {onCancel && (
            <button className="cancel-btn" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button className="save-btn" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
