import { createStackNavigator } from '@react-navigation/stack'
import FormCarro from './FormCarro'
import ListaCarro from './ListaCarro'


const Stack = createStackNavigator()

export default function StackPessoas() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaCCarro' 
        >
            <Stack.Screen name='ListaCarro' component={ListaCarro} /> 
            <Stack.Screen name='FormCarro' component={FormCarro} />
        </Stack.Navigator>
    )
}
