import React from "react";
import PageWrapper from "../components/PageWrapper";
import { Timeline } from "@material-ui/lab";
import { Link } from "gatsby";
const DashboardMessagebox = () => {
  return (
    <>
      <PageWrapper
        headerConfig={{
          button: "profile",
          isFluid: true,
          bgClass: "bg-default",
          reveal: false
        }}
      >
        <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
          <div className="container">
            <div className="row justify-content-center mt-14">
              <div className="col-xxl-6 col-xl-7 col-lg-8">
                <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                  <div className="row">
                    <div className="col-12 mb-7"></div>
                    <div className="col-lg-12 mb-7">
                      <label
                        htmlFor="message"
                        className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                      >
                        Message
                      </label>
                    </div>
                    <div className="my-15 px-11">
                      <Link
                        to="/contact"
                        className="btn btn-primary btn-xl w-100 text-uppercase"
                      >
                        <span className="mr-5 d-inline-block">+</span>
                        메시지 보내기
                      </Link>
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

export default DashboardMessagebox;
