import React from 'react';
import {BrowserRouter,Route , Switch , Link , NavLink} from 'react-router-dom';
import Panel from '../components/Panel';
import RequestForm from '../components/RequestForm'
// import history from '../history/history';
import NotFoundPage from '../components/NotFoundPage'
const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={Panel} exact={true}/>
                <Route path="/request" component={RequestForm}/>   
                <Route component={NotFoundPage} />    
            </Switch>
        </div>
    </BrowserRouter>    
);

export default AppRouter ;  