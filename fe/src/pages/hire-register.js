import React, { useCallback, useEffect, useState } from "react";
import { Tab } from "react-bootstrap";
import { Link } from "gatsby";
import PageWrapper from "../components/PageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { hireRegister } from "../state/reducer/hire.reducer";
import { producerSelector } from "../state/reducer/producer.reducer";
import {
  fileRegister,
  profileSelector
} from "../state/reducer/profile.reducer";
import cameraIcon from "../assets/image/ico_camera.svg";
import "../scss/css/fileUpload.css";
import Swal from "sweetalert2";

const sweetalert = (icon, title, text, footer) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    footer: footer
  });
};

const HireRegister = () => {
  const dispatch = useDispatch();

  const producerState = useSelector(producerSelector);
  const profileState = useSelector(profileSelector);

  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);

  console.log("profileState :" + profileState.fileList);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("handleSubmit" + JSON.stringify(inputs));
    dispatch(hireRegister(inputs));
    Swal.fire({
      icon: "success",
      title: "공고가 등록되었습니다."
    });
  };
  const handleChange = useCallback(
    e => {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value
      });
    },
    [inputs]
  );
  useEffect(() => {
    setInputs({
      ...inputs,
      producer: producerState.producer,
      files: profileState.fileList
    });
  }, [profileState, producerState]);

  const handleSelectedImage = useCallback(e => {
    e.preventDefault();

    const formData = new FormData();
    const imgFile = e.target.files[0];
    const imgUrl = URL.createObjectURL(imgFile);

    formData.append("uploadFiles", imgFile);
    dispatch(fileRegister(formData));
    setImage(imgUrl);
  });

  return (
    <>
      <PageWrapper headerConfig={{ button: "profile" }}>
        <div className="bg-default-2 pt-16 pt-lg-22 pb-lg-27">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 mt-13 dark-mode-texts">
                <div className="mb-9">
                  <Link to="/#" className="d-flex align-items-center ml-4">
                    <i className="icon icon-smaxwll-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8" />
                    <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                      Back
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row ">
              <form onSubmit={handleSubmit}>
                <div className="col-12 col-xl-9 col-lg-8"></div>
                <div className="bg-white rounded-4 pt-11 shadow-9">
                  <div className="d-xs-flex align-items-center pl-xs-12 mb-8 text-center text-xs-left">
                    <div className="">
                      <input
                        type="text"
                        className="form-control h-px-48 thumnail-margin"
                        name="title"
                        onChange={handleChange}
                        value={inputs.title}
                      />
                      <div
                        id="userActions"
                        className="square-144 m-auto px-6 mb-7 "
                      >
                        <label
                          htmlFor="fileUpload"
                          className="mb-0 font-size-4 text-smoke"
                        >
                          {image === null ? (
                            <img
                              className="pic_basic btn_custom_file_camera"
                              src={cameraIcon}
                            />
                          ) : (
                            profileState.fileList.map(file => {
                              return (
                                <img
                                  alt=""
                                  className="pic_basic btn_custom_file_camera thumnail-size"
                                  src={`http://localhost:8080/files/display?fileName=s_${file.uuid}_${file.fileName}`}
                                />
                              );
                            })
                          )}
                        </label>

                        <input
                          type="file"
                          accept="image/*"
                          id="fileUpload"
                          className="sr-only"
                          onChange={handleSelectedImage}
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
                          <fieldset>
                            <div className="row mb-xl-1 mb-9">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="namedash"
                                    className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                                  >
                                    촬영 날짜
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control h-px-48"
                                    id="namedash"
                                    name="filming"
                                    onChange={handleChange}
                                    value={inputs.filming}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="namedash"
                                    className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                                  >
                                    마감날짜
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control h-px-48"
                                    id="namedash"
                                    name="deadline"
                                    onChange={handleChange}
                                    value={inputs.deadline}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="namedash"
                                    className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                                  >
                                    작품제목
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control h-px-48"
                                    id="namedash"
                                    name="project"
                                    onChange={handleChange}
                                    value={inputs.project}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label
                                    htmlFor="select2"
                                    className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                                  >
                                    모집인원
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control h-px-48"
                                    id="namedash"
                                    name="personnel"
                                    onChange={handleChange}
                                    value={inputs.personnel}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row mb-8">
                              <div className="col-lg-6 mb-xl-0 mb-7">
                                <div className="form-group position-relative">
                                  <label
                                    htmlFor="select3"
                                    className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                                  >
                                    모집역할
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control h-px-48"
                                    id="namedash"
                                    name="cast"
                                    onChange={handleChange}
                                    value={inputs.cast}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group position-relative">
                                  <label
                                    htmlFor="address"
                                    className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                                  >
                                    급여
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control h-px-48"
                                    id="namedash"
                                    name="guarantee"
                                    onChange={handleChange}
                                    value={inputs.guarantee}
                                  />
                                  <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6" />
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label
                                    htmlFor="aboutTextarea"
                                    className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                                  >
                                    작품소개
                                  </label>
                                  <textarea
                                    name="contents"
                                    id="aboutTextarea"
                                    cols="30"
                                    rows="7"
                                    className="border border-mercury text-gray w-100 pt-4 pl-6"
                                    placeholder="Describe about the company what make it unique"
                                    onChange={handleChange}
                                    value={inputs.contents}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <button className="btn btn-green btn-h-60 text-white min-width-px-210 rounded-5 text-uppercase">
                                  등록하기
                                </button>
                              </div>
                            </div>
                          </fieldset>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default HireRegister;
