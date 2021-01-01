import React from 'react';
import Header from '../Header';

const BaseLayout = ({ children }) => {
    return <div>
        <Header />
        {children}
    </div>

}

export default BaseLayout;