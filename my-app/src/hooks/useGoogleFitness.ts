import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = 'm';
const API_KEY = '';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest"];
const SCOPES = "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.nutrition.read";

const useGoogleFitness = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            }).then(() => {
                const authInstance = gapi.auth2.getAuthInstance();
                setIsSignedIn(authInstance.isSignedIn.get());
                authInstance.isSignedIn.listen(setIsSignedIn);

                if (!authInstance.isSignedIn.get()) {
                    authInstance.signIn();
                }
            });
        };
        gapi.load('client:auth2', initClient);
    }, []);

    const getFitnessData = async () => {
        try {
            const now = new Date();
            const startTimeMillis = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime(); // 7 days ago
            const endTimeMillis = now.getTime(); // now

            // Fetch Calories Data
            const caloriesResponse = await gapi.client.fitness.users.dataset.aggregate({
                userId: 'me',
                requestBody: {
                    aggregateBy: [{
                        dataTypeName: 'com.google.calories.expended',
                        dataSourceId: "derived:com.google.step_count.delta:com.google.ios.fit:appleinc.:watch:19500cc8:top_level"
                    }],
                    bucketByTime: { durationMillis: 86400000 }, // 1 day in milliseconds
                    startTimeMillis,
                    endTimeMillis,
                }
            });

            console.log('Calories Data:', caloriesResponse.result);

            return caloriesResponse.result;

        } catch (error: any) {
            console.error('Error fetching fitness data:', error);
            if (error.status === 403) {
                // Re-authenticate the user if permission is denied
                const authInstance = gapi.auth2.getAuthInstance();
                authInstance.signIn();
            }
        }
    };

    const handleSignIn = () => {
        gapi.auth2.getAuthInstance().signIn();
    };

    const handleSignOut = () => {
        gapi.auth2.getAuthInstance().signOut();
    };

    return { isSignedIn, handleSignIn, handleSignOut, getFitnessData };
};
export default useGoogleFitness;
