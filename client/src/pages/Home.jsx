import { useQuery } from '@apollo/client';

import ProjectList from '../components/ProjectList/ProjectList'
import Header from '../components/Header/Header';



import { QUERY_PROJECTS } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_PROJECTS)
    const projects = data?.projects || [];

    return (
        <main>
            <div className='home-projects-list'>
            <Header />
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    
                    <ProjectList
                    projects={projects}
                    title=""
                    />
                )}
            </div>
        </main>
    );
};

export default Home;