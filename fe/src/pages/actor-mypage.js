import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PageWrapper from '../components/PageWrapper';

import MyProfileList from '../components/Profile/MyprofileList';
import { resetProfileSelector } from '../state/reducer/profile.reducer';

const DashboardMain = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(resetProfileSelector());
        };
    }, []);
    return (
        <>
            <PageWrapper
                headerConfig={{
                    button: 'profile',
                    isFluid: true,
                    bgClass: 'bg-default',
                    reveal: false,
                }}
            >
                <div className="dashboard-main-container mt-25 mt-lg-31">
                    <div style={{ height: '1500px' }} className="container">
                        <div className="row mb-7">
                            <MyProfileList />
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    );
};
export default DashboardMain;
