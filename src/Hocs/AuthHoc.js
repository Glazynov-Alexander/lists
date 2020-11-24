import React from "react";
import {Redirect} from "react-router";



export let AuthHoc = (Component, props) => {
    class HocComponent extends React.Component {

        render() {
            if (props.auth) {
                // auth зависит от того есть ли токен
                //проверка если пользователь зарегистрирован  перенаправляем его на главную страницу
                return <Redirect to="/tasks"/>
            }
            return <Component/>
        }
    }

    return <HocComponent/>
}