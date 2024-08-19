import { useDispatch } from "react-redux";
import { clearAuthState } from "./features/authSlice";
import { TouchableOpacity, Text } from "react-native";

const Profile: React.FC = () => {

  const handleClick = () => {
    dispatch(clearAuthState());
  }

  const dispatch = useDispatch();
  return (
    <>
      <TouchableOpacity onPress={handleClick}>
        <Text>Se déconnecter</Text>
      </TouchableOpacity>
    </>
  );
}

export default Profile;
