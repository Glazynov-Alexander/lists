import React from "react";

import {Redirect} from "react-router";


export let AppHoc = (Component, props) => {
    class HocComponent extends React.Component {
        render() {
            return <Component {...props}/>
        }
    }

    if (!props.auth) {
        // если нет токена перенаправляем его на регистрацию
        return <Redirect to="/registration"/>
    }

    return <HocComponent/>

}