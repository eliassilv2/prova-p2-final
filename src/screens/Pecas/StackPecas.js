import { createStackNavigator } from '@react-navigation/stack'
import ListaPecas from './ListaPecas'
import FormPecas from './FormPecas'
const Stack = createStackNavigator()

export default function StackPessoas() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaPecas' 
        >
            <Stack.Screen name='ListaPecas' component={ListaPecas} /> 
            <Stack.Screen name='FormPecas' component={FormPecas} />
        </Stack.Navigator>
    )
}
