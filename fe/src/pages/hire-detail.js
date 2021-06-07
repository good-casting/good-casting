import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import PageWrapper from "../components/PageWrapper";
import imgF1 from "../assets/image/l2/png/featured-job-logo-1.png";
import iconD from "../assets/image/svg/icon-dolor.svg";
import iconB from "../assets/image/svg/icon-briefcase.svg";
import iconL from "../assets/image/svg/icon-location.svg";
import { useDispatch, useSelector } from "react-redux";
import { hireDetail, hireSelector } from "../state/reducer/hire.reducer";
import { profileList, profileSelector } from "../state/reducer/profile.reducer";

const JobDetails = ({ location }) => {
  const userInfo =
    typeof window !== `undefined`
      ? JSON.parse(localStorage.getItem("USER"))
      : null;

  const dispatch = useDispatch();

  const hire = useSelector(hireSelector).hire;
  const pageResult = useSelector(profileSelector).pageResult;
  const pageRequest = useSelector(profileSelector).pageRequest;

  const [inputs, setInputs] = useState({});

  useEffect(() => {
    dispatch(hireDetail(location.state.id));
  }, []);

  useEffect(() => {
    dispatch(
      profileList({
        ...pageRequest,
        actorId: userInfo[1].actorId
      })
    );
  }, [inputs]);

  return (
    <>
      <PageWrapper headerConfig={{ button: "profile" }}>
        <div className="jobDetails-section bg-default-1 pt-28 pt-lg-27 pb-xl-25 pb-12">
          <div className="container">
            <div className="row justify-content-center">
              {/* <!-- back Button --> */}
              <div className="col-xl-10 col-lg-11 mt-4 ml-xxl-32 ml-xl-15 dark-mode-texts">
                <div className="mb-9">
                  <Link
                    to="/hire-list"
                    className="d-flex align-items-center ml-4"
                  >
                    <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                    <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                      리스트 보기
                    </span>
                  </Link>
                </div>
              </div>
              {/* <!-- back Button End --> */}
              <div className="col-xl-9 col-lg-11 mb-8 px-xxl-15 px-xl-0">
                <div className="bg-white rounded-4 border border-mercury shadow-9">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
                    <div className="row">
                      <div className="col-md-6">
                        {/* <!-- media start --> */}
                        <div className="media align-items-center">
                          {/* <!-- media logo start --> */}
                          <div className="square-72 d-block mr-8">
                            <img src={imgF1} alt="" />
                          </div>
                          {/* <!-- media logo end --> */}
                          {/* <!-- media texts start --> */}
                          <div>
                            <h3 className="font-size-6 mb-0">{hire.project}</h3>
                            <span className="font-size-3 text-gray line-height-2">
                              AirBnb
                            </span>
                          </div>
                          {/* <!-- media texts end --> */}
                        </div>
                        {/* <!-- media end --> */}
                      </div>
                      <div className="col-md-6 text-right pt-7 pt-md-0 mt-md-n1">
                        {/* <!-- media date start --> */}
                        <div className="media justify-content-md-end">
                          <p className="font-size-4 text-gray mb-0">
                            {hire.deadline.slice(0, 10)}
                          </p>
                        </div>
                        {/* <!-- media date end --> */}
                      </div>
                    </div>
                    <div className="row pt-9">
                      <div className="col-12">
                        {/* <!-- card-btn-group start --> */}
                        <div>
                          <Link
                            state={{ id: location.state.id }}
                            to="/hire-apply"
                          >
                            <button className="btn btn-primary text-uppercase font-size-3">
                              apply to this job
                            </button>
                          </Link>
                        </div>
                        {/* <!-- card-btn-group end --> */}
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Single Featured Job --> */}
                  <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts">
                    <div className="row mb-7">
                      <div className="col-md-4 mb-md-0 mb-6">
                        <div className="media justify-content-md-start">
                          <div className="image mr-5">
                            <img src={iconD} alt="" />
                          </div>
                          <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                            회당 {hire.guarantee}
                            만원
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 pr-lg-0 pl-lg-10 mb-md-0 mb-6">
                        <div className="media justify-content-md-start">
                          <div className="image mr-5">
                            <img src={iconB} alt="" />
                          </div>
                          <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                            Full-Time
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 pl-lg-0">
                        <div className="media justify-content-md-start">
                          <div className="image mr-5">
                            <img src={iconL} alt="" />
                          </div>
                          <p className="font-size-5 text-gray mb-0">
                            777 Brockton Avenue,{" "}
                            <br className="d-md-none d-lg-block d-block" />
                            Abington MA 2351
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-lg-0 mb-10">
                        <div className="">
                          <span className="font-size-4 d-block mb-4 text-gray">
                            배역
                          </span>
                          <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                            {hire.cast}
                          </h6>
                        </div>
                      </div>
                      <div className="col-md-4 pr-lg-0 pl-lg-10 mb-lg-0 mb-8">
                        <div className="">
                          <span className="font-size-4 d-block mb-4 text-gray">
                            촬영일
                          </span>
                          <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                            {hire.filming}
                          </h6>
                        </div>
                      </div>
                      <div className="col-md-4 pl-lg-0">
                        <div className="">
                          <span className="font-size-4 d-block mb-4 text-gray">
                            모집 인원
                          </span>
                          <h6 className="font-size-5 text-black-2 font-weight-semibold mb-0">
                            {hire.personnel}명
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 light-mode-texts">
                    <div className="row">
                      <div className="col-xl-11 col-md-12 pr-xxl-9 pr-xl-10 pr-lg-20">
                        <div className="">
                          <p className="mb-4 font-size-4 text-gray">
                            Job Description
                          </p>
                          <p className="font-size-4 text-black-2 mb-7">
                            {hire.contents}
                          </p>
                        </div>
                        <div className="">
                          <span className="font-size-4 font-weight-semibold text-black-2 mb-7">
                            Producer
                          </span>
                          <p className="font-size-4 text-black-2 mb-7">
                            name: {hire.producer.name}
                          </p>
                          <p className="font-size-4 text-black-2 mb-7">
                            email: {hire.producer.email}
                          </p>
                          <p className="font-size-4 text-black-2 mb-7">
                            phone: {hire.producer.phone}
                          </p>
                          <p className="font-size-4 text-black-2 mb-7"></p>
                        </div>
                      </div>
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
export default JobDetails;
