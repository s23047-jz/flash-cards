import { NavigationProp } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";


export interface ScreenProps {
    navigation: NavigationProp<any>;
    route?: RouteProp<any>;
}
