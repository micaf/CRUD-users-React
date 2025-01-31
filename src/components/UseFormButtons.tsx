
type UserFormButtonsProps = { onClose: () => void; onSave: () => void; formIsValid: boolean }

const UserFormButtons: React.FC<UserFormButtonsProps> = ({ onClose, onSave, formIsValid }) => (
    <div className="flex gap-2">
        <button className="secondary" onClick={onClose}>Cancel</button>
        <button className="primary" onClick={() => formIsValid && onSave()} disabled={!formIsValid}>
            Save
        </button>
    </div>
);


export default UserFormButtons;