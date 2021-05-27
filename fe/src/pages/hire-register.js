import React from 'react';
import { Nav, Tab } from 'react-bootstrap';
import { Link } from 'gatsby';
import PageWrapper from '../components/PageWrapper';

import imgF1 from '../assets/image/l2/png/featured-job-logo-1.png';

const hireRegister = () => {
    return (
        <>
            <PageWrapper headerConfig={{ button: 'profile' }}>
                <div className="bg-default-2 pt-16 pt-lg-22 pb-lg-27">
                    <div className="container">
                        {/* <!-- back Button --> */}
                        <div className="row justify-content-center">
                            <div className="col-12 mt-13 dark-mode-texts">
                                <div className="mb-9">
                                    <Link
                                        to="/#"
                                        className="d-flex align-items-center ml-4"
                                    >
                                        <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                                        <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                                            Back
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* <!-- back Button End --> */}
                        <div className="row ">
                            {/* <!-- Company Profile --> */}
                            <div className="col-12 col-xl-9 col-lg-8">
                                <div className="bg-white rounded-4 pt-11 shadow-9">
                                    <div className="d-xs-flex align-items-center pl-xs-12 mb-8 text-center text-xs-left">
                                        <Link
                                            to="/#"
                                            className="mr-xs-7 mb-5 mb-xs-0"
                                        >
                                            <img
                                                className="square-72 rounded-6"
                                                src={imgF1}
                                                alt=""
                                            />
                                        </Link>
                                        <div className="">
                                            <h2 className="mt-xs-n5">
                                                <Link
                                                    to="/#"
                                                    className="font-size-6 text-black-2 font-weight-semibold"
                                                >
                                                    Airbnb INC.
                                                </Link>
                                            </h2>
                                            <input
                                                type="text"
                                                className="mb-0 text-gray font-size-4"
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <Tab.Container
                                        id="left-tabs-example"
                                        defaultActiveKey="jobs"
                                    >
                                        <Tab.Content className="pl-12 pt-10 pb-7 pr-12 pr-xxl-24">
                                            <Tab.Pane eventKey="jobs">
                                                {/* <!-- Middle Body Start --> */}
                                                <div className="row">
                                                    <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                                                        <div className="mb-8">
                                                            <p className="font-size-4">
                                                                촬영시기
                                                            </p>
                                                            <input
                                                                type="text"
                                                                className="font-size-4 font-weight-semibold"
                                                            />
                                                        </div>
                                                        <div className="mb-8">
                                                            <p className="font-size-4">
                                                                급여
                                                            </p>
                                                            <input
                                                                type="text"
                                                                className="font-size-4 font-weight-semibold"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                                                        <div className="mb-8">
                                                            <p className="font-size-4">
                                                                모집인원
                                                            </p>
                                                            <input
                                                                type="text"
                                                                className="font-size-4 font-weight-semibold"
                                                            />
                                                        </div>
                                                        <div className="mb-8">
                                                            <p className="font-size-4">
                                                                작품제목
                                                            </p>
                                                            <input
                                                                type="text"
                                                                className="font-size-4 font-weight-semibold"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-lg-4 col-md-4 col-xs-6">
                                                        <div className="mb-8">
                                                            <p className="font-size-4">
                                                                모집역할
                                                            </p>
                                                            <input
                                                                type="text"
                                                                className="font-size-4 font-weight-semibold"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pr-xl-0 pr-xxl-22 pt-5">
                                                    <h4 className="font-size-6 mb-7">
                                                        작품 소개
                                                    </h4>
                                                    <input
                                                        type="text"
                                                        placeholder="작품소개를 입력해주세요"
                                                        className="font-size-4 mb-8"
                                                    />
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>
                            </div>
                            {/* <!-- Company Profile End --> */}
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    );
};

export default hireRegister;
