import { User } from "../../models/User";
import styles from "./UserCard.module.css"; 
type UserCardProps = {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
};

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => (
  <div className={styles.userCard}>
    <div className={styles.userCardInfo}>
      <div className={styles.userInfo}>
        <h3>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h3>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
      <img src={user.image} alt={user.username} className={styles.userAvatar} />
    </div>

    <div className={styles.userActions}>
      <button className="btn btn-primary" onClick={onEdit}>Edit</button>
      <button className="btn btn-danger" onClick={onDelete}>Delete</button>
    </div>
  </div>
);

export default UserCard;
