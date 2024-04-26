import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div>
                <Header />
                <div className='container'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </ApolloProvider>
    );
}

export default App;