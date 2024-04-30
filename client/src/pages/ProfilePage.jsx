import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Auth from '../utils/auth';
// import { QUERY_USER_PROFILE } from '../utils/queries';


const ProfilePage = () => {
    const { profileId } = useParams();

    const { loading, data } = useQuery(QUERY_USER_PROFILE, {
        variables: { profileId: profileId},
    });

    const user = data?.user || {};

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='profile-container'>
            <h2 className='profile-username'>
                {user.firstName} {user.lastName}'s <br />

            </h2>
        </div>
    );
};

export default ProfilePage;