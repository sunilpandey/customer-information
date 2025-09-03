import type { User } from "../../context/UserContext";

export function UserPanel({ user }: { user: User }) {
  return (
    <div className="flex items-center p-4">
      <img
        src={user.profilePic}
        alt={user.userName}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <h4 className="font-bold">{user.userName}</h4>
        <p className="text-sm text-gray-600">{user.designation}</p>
      </div>
    </div>
  );
}