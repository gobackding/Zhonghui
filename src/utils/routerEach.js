import React, { Fragment } from "react"
import { Switch, Route, Redirect } from "react-router-dom"

export default (routes) => {
    const routesEach = (parmams) => {
        return <Route path={parmams.path} key={parmams.key} render={() => {
            // eslint-disable-next-line no-unused-expressions
            <Fragment>
                <Route component={parmams.component} />
                <Redirect to={parmams.children[0].path} />
                <Switch>
                    {
                        parmams.children.map(child => {
                            if (child.children) {
                                return routesEach(child)
                            } else {
                                return <Route path={child.path} component={child.component} key={child.key}></Route>
                            }
                        })
                    }
                </Switch>
            </Fragment>
        }} />
    }

    return routes.map((route) => {
        if (route.children) {
            return routesEach(route)
        } else {
            return <Route path={route.path} component={route.component} key={route.key}></Route>
        }
    })
}