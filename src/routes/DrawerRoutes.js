
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import StackCCarro from '../screens/CCarro/StackCarro'
import StackCadastro from '../screens/Cadastro/StackCad'
import StackPecas from '../screens/Pecas/StackPecas'
import StackProblemas from '../screens/Problemas/StackProblemas'
import StackPedidos from '../screens/Pedidos/StackPedidos'
const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name="Vendedor" component={StackCadastro} />
            <Drawer.Screen name="Veículos" component={StackCCarro} />
            <Drawer.Screen name="Peças" component={StackPecas}/>
            <Drawer.Screen name="Problemas" component={StackProblemas} />
            <Drawer.Screen name="Pedidos" component={StackPedidos} />
            

        </Drawer.Navigator>

    )
}