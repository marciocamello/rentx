declare namespace ReactNavigation {
    export interface RootParamList extends RootStackParamList {
        Splash: NavigationStackProp<string>;
        Home: NavigationStackProp<string>;
        CarDetails: NavigationStackProp<string>;
        Scheduling: NavigationStackProp<string>;
        SchedulingDetails: NavigationStackProp<string>;
        MyCars: NavigationStackProp<string>;
        SignIn: NavigationStackProp<string>;
        SignUpFirstStep: NavigationStackProp<string>;
        SignUpSecondStep: NavigationStackProp<string>;
        Confirmation: NavigationStackProp<string>;
    }
}
