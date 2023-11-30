import { createStackNavigator } from '@react-navigation/stack'
import FormPedidos from './FormPedidos'
import ListaPedidos from './ListaPedidos'
const Stack = createStackNavigator()

export default function StackPessoas() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaPedidos'
        >

            <Stack.Screen name='ListaPedidos' component={ListaPedidos} />

            <Stack.Screen name='FormPedidos' component={FormPedidos} />

        </Stack.Navigator>

    )
}
