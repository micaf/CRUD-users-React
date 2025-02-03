
import styles from "./UserFormButtons.module.css";

type UserFormButtonsProps = { onClose: () => void; onSave: () => void; formIsValid: boolean }

const UserFormButtons: React.FC<UserFormButtonsProps> = ({ onClose, onSave, formIsValid }) => {
    return (
        <div className={styles.buttonGroup}>
            <button className="btn btn-danger" onClick={onClose}>
                Cancel
            </button>
            <button className="btn btn-primary" onClick={onSave} disabled={!formIsValid}>
                Save
            </button>
        </div>

    );
}

export default UserFormButtons;