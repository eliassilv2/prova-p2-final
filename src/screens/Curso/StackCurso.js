import { createStackNavigator } from '@react-navigation/stack'
import FormCurso from './FormCurso'
import ListaCurso from './ListaCurso'

const Stack = createStackNavigator()

export default function StackCurso() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Listafeed' 
        >
            <Stack.Screen name='ListaCurso' component={ListaCurso} /> 
            <Stack.Screen name="FormCurso" component={FormCurso} />
        </Stack.Navigator>
    )
}
