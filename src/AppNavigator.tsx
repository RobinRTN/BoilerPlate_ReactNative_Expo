import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Predictions from './Predictions';
import Leagues from './Leagues';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure you're importing correctly
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the icon set


const Tab = createBottomTabNavigator();


const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      // Define the icons for each route
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string = '';

        switch (route.name) {
          case 'Predictions':
            iconName = 'fire';
            break;
          case 'Leagues':
            iconName = focused ? 'trophy' : 'trophy-outline';
            break;
          case 'Leaderboard':
            iconName = focused ? 'crown' : 'crown';
            break;
          case 'Profile':
            iconName = focused ? 'account' : 'account-outline';
            break;
          default:
            iconName = 'circle';
            break;
        }

        // Return the icon component
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
      // Active and inactive colors
      tabBarActiveTintColor: '#818CF8',
      tabBarInactiveTintColor: '#bcc2fb',
      // Style adjustments
      tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarStyle: {
        paddingBottom: 5,
        height: 60,
        backgroundColor: "#02012B",
      },

      tabBarLabelPosition: 'below-icon',
    })}
  >
      <Tab.Screen name="Predictions" component={Predictions}/>
      <Tab.Screen name="Leagues" component={Leagues}/>
      <Tab.Screen name="Leaderboard" component={Leaderboard}/>
      <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>
  )
}


export default AppNavigator;
