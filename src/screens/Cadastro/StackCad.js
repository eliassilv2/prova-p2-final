import { createStackNavigator } from '@react-navigation/stack'
import FormCad from './FormCad'
import ListaCad from './ListaCad'

const Stack = createStackNavigator()

export default function StackPessoas() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Listafeed' 
        >
            <Stack.Screen name='ListaCad' component={ListaCad} /> 
            <Stack.Screen name="FormCad" component={FormCad} />
        </Stack.Navigator>
    )
}
