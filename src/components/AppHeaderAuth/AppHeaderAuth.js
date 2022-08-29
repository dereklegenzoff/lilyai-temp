import React from 'react';

// React Context for Auth
import { useAuth } from '../../contexts/AuthContext';

export default function AppHeaderAuth() {
    // React Context: User Authentication
    const user = useAuth();

    // Default sign in
    let html = <a href="/login">Sign In</a>;

    // User profile and sign out
    const clientPrincipal = (user && user.clientPrincipal) || null;
    const userDetails = (clientPrincipal && clientPrincipal.userDetails) || null;

    if (userDetails) {
        html = (
            <Link href="/logout">
                <Typography>{`${userDetails} | Sign Out`}</Typography>
            </Link>
        );
    }

    return html;
}
