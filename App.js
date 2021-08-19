import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';

// must be imported to avoid crashes in production
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// for navigation, supports web a tags
import { Link } from '@react-navigation/native'
{/* <Link to={{ screen: 'Profile', params: { id: 'jane' } }}> */}
  // Go to Jane's profile
// </Link>

import { useLinkProps } from '@react-navigation/native';

// ...

const LinkButton = ({ to, action, children, ...rest }) => {
  const { onPress, ...props } = useLinkProps({ to, action });

  const [isHovered, setIsHovered] = React.useState(false);

  if (Platform.OS === 'web') {
    // It's important to use a `View` or `Text` on web instead of `TouchableX`
    // Otherwise React Native for Web omits the `onClick` prop that's passed
    // You'll also need to pass `onPress` as `onClick` to the `View`
    // You can add hover effects using `onMouseEnter` and `onMouseLeave`
    return (
      <View
        onClick={onPress}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ transitionDuration: '150ms', opacity: isHovered ? 0.5 : 1 }}
        {...props}
        {...rest}
      >
        <Text>{children}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} {...props} {...rest}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};



function OnboardingPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Onboarding Page</Text>
      <Button title="Home" onPress={()=> navigation.navigate('Home')} ></Button>   
    </View>
  );
}
function HomePage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Page</Text>
      <Button title="Go" onPress={()=> navigation.navigate('Details', { id: 233 })} ></Button>
      <Button title="MyProfile" onPress={()=> navigation.navigate('Profile', { screen: 'MyProfile' })} ></Button>   

      <Link to='/create-account'>
        <View>
          <Text>Create Account</Text>
        </View>
      </Link> 
      <Link to='/profile/my'>
        My profile
      </Link> 

      <LinkButton to='/profile/my'>
        My profile
      </LinkButton> 
    </View>
  );
}
function BusinessDetailsPage({ route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> business id {route.params.id} details Page</Text>
    </View>
  );
}
function ProfilePage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> profike Page</Text>
      <Button title="Update Profile" onPress={()=> navigation.navigate('Profile', { screen: 'MyProfileUpdate' })} ></Button> 
      <Button title="Login" onPress={()=> navigation.navigate('Profile', { screen: 'Login' })} ></Button>
      <Button title="Update Password" onPress={()=> navigation.navigate('Profile', { screen: 'MyProfileUpdatePassword' })} ></Button>   
    </View>
  );
}
function UpdateProfilePage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>update profike Page</Text>
    </View>
  );
}
function UpdateProfilePasswordPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>update profike password Page</Text>
    </View>
  );
}
function LoginPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Page</Text>
    </View>
  );
}
function  CreateAccountPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> Create Account Page</Text>
    </View>
  );
}


function  CreateBusinessPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> Create Business Page</Text>
    </View>
  );
}
function  HowToBecomeABusinessPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> How to become a business Account Page</Text>
    </View>
  );
}
function  BusinessUpdatePage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> Create Account Page</Text>
    </View>
  );
}

function  NotFoundPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> NotFoundPage Page</Text>
    </View>
  );
}


const linking = {
  // prefixes: [
  // ],
  config: {
    screens: {
      TutorialScreen: 'tutorial',
      Home: '',
      Details: 'business/:id',
      Profile: {
        path: 'profile',
        screens: {
          MyProfile: 'my',
          MyProfileUpdate: 'update',
          MyProfileUpdatePassword: 'password',
          Login: {
            path: 'login',
            // allows the route to show without its direct parents path 
            // ie, rather than /profile/login show /login
            exact: true,
          },
          CreateAccount: {
            path: 'create-account',
            exact: true,
          },
        },
      },
      NotFound: "*"
    },
  },
};


const ProfileStack = createNativeStackNavigator();
const ProfileDrawer = createDrawerNavigator()
const Stack = createNativeStackNavigator();


const ProfileDrawerComponent = ()=> {
  return (
    <ProfileDrawer.Navigator>
      <ProfileDrawer.Screen name="MyProfile" component={ProfilePage} />
      <ProfileDrawer.Screen name="MyProfileUpdate" component={UpdateProfilePage} />
      <ProfileDrawer.Screen name="MyProfileUpdatePassword" component={UpdateProfilePasswordPage} />
      <ProfileDrawer.Screen name="CreateAccount" component={CreateAccountPage} />
      <ProfileDrawer.Screen name="Login" component={LoginPage} />
    </ProfileDrawer.Navigator>
  )
}
const ProfileStackComponent = ()=> {
  return (
    <ProfileStack.Navigator screenOptions={{ gestureEnabled: true }}>
      <ProfileStack.Screen name="MyProfile" component={ProfilePage} />
      <ProfileStack.Screen name="MyProfileUpdate" component={UpdateProfilePage} />
    </ProfileStack.Navigator>
  )
}

/** screenOptions={{ gestureEnabled: true }}
 * enables swipe to go back gestures on android -> its enabled on ios
 */
export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{ 
          gestureEnabled: true,
          // hides previous screen name from back button in ios
          headerBackTitleVisible: false,
        }}
        // ensure header stays at the top without animating from the bottom
        // android
        headerMode='float'
        // a component to show before RN resolves the initial deep link
        fallback={<Text> loading </Text>}
      >
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Details" component={BusinessDetailsPage} />


        <Stack.Screen name="Profile" component={ProfileDrawerComponent} />
        {/* NotFoundPage */}
        
        <Stack.Screen name="NotFound" component={NotFoundPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}