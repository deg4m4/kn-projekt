import { useState, useEffect } from 'react'
import axios from 'axios'
import Home from "./Components/Dashboard/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./Components/Auth/Auth/Auth";
import Main from "./Components/Admin/Main/Main";
import Init from "./Components/Init/Init";
import { Helmet } from "react-helmet";
import { conf } from './conf/conf';
import Public from './Components/Dashboard/Public/Public';
import Homepage from './Components/Homepage/Main/Main';

const App = () => {

    const [meta, setMeta] = useState([])
    useEffect(() => {
        axios.post(conf.endPoint + "/api/getMeta").then((resp) => {
          
                setMeta(resp.data[0])
            
        });
    }, []);
    return (
        <div className="app" >
            <Helmet>
                <meta charSet="utf-8" />
                <title>{ meta!== undefined && meta.websiteTitle}</title>
                <meta
                    name="description"
                    content={  meta!== undefined && meta.websiteDescription}
                />
               <meta
                    name="keywords"
                    content={  meta!== undefined && meta.websiteKeywords}
                />
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>  
            <Router>
                <Switch>
                <Route  path="/members" render={(props)=><Home {... props}  meta={meta}   />} />
                <Route path="/admin" component={Main} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/i" component={Init} />
                <Route exact path="/" render={ (props)=>< Homepage {... props} meta={meta}  />} />

                <Route  path="/" render={(props)=><Public {... props} meta={meta}  /> } />
                </Switch>
            </Router>
        </div>
    )
}

export default App