import React, { useContext } from 'react';
import { Link } from 'gatsby';
import GlobalContext from '../context/GlobalContext';
import PageWrapper from '../components/PageWrapper';
import ProfileList from '../components/Profile/ProfileList';
import ProfileSidebar from '../components/ProfileSidebar';

const defaultCountries = [
    { value: 'sp', label: 'Singapore' },
    { value: 'bd', label: 'Bangladesh' },
    { value: 'usa', label: 'United States of America' },
    { value: 'uae', label: 'United Arab Emirates' },
    { value: 'pk', label: 'Pakistan' },
];

const ActorMypage = () => {
    return (
        <>
            <PageWrapper>
                <div className="bg-default-1 pt-26 pt-lg-28 pb-13 pb-lg-25">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-xxl-3 col-lg-4 col-md-5 mb-11 mb-lg-0">
                                <ProfileSidebar />
                            </div>
                            <div className="col-12 col-md-8 col-xs-12 ">
                                <div className="pt-12 ml-lg-0 ml-md-15">
                                    <div className="pt-6">
                                        <Link to="/profile-register">
                                            <button className="btn btn-primary text-uppercase font-size-3">
                                                프로필등록하기
                                            </button>
                                        </Link>
                                        <div className="row justify-content-center">
                                            <div className="col-12 col-lg-6">
                                                {null ? (
                                                    <ProfileList />
                                                ) : (
                                                    <p>프로필을 등록해주세요</p>
                                                )}
                                            </div>
                                            <div className="col-12 col-lg-6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    );
};
export default ActorMypage;
