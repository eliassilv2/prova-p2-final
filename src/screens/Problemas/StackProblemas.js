import { createStackNavigator } from '@react-navigation/stack'
import FormProblemas from './FormProblemas'
import ListaProblemas from './ListaProblemas'

const Stack = createStackNavigator()

export default function StackPessoas() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaProblemas' 
        >
            <Stack.Screen name='ListaProblemas' component={ListaProblemas} /> 
            <Stack.Screen name='FormProblemas' component={FormProblemas} />
        </Stack.Navigator>
    )
}
