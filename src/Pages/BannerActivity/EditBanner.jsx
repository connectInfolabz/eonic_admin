import React, { useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Common/Sidebar";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function EditBanner() {
  const location = useLocation();
  const navigate = useNavigate();
  const maxLength = 150;

  const { banner } = location.state;
  const [data, setData] = useState({
    bannerId: banner._id,
    bannerTitle: banner.bannerTitle,
    bannerDesc: banner.bannerDesc,
    bannerImg: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpdate = (files) => {
    setData((prevData) => ({
      ...prevData,
      bannerImg: files.length > 0 ? files[0].file : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MONGO_BASE_URL}/admin/editBanner`,
        formData
      );
      if (response.data.success) {
        toast.success("Banner Edited Successfully!!", {
          autoClose: 1500,
          onClose: () => navigate("/viewBanner"),
        });
      } else {
        toast.error("Banner Not Edited!!", {
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <div id="app">
        <Sidebar />
        <div id="main">
          <Header />
          <div className="page-heading">
            <h3>Add Banner</h3>
          </div>
          <div className="page-content">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content">
                    <form
                      className="card-body"
                      onSubmit={handleSubmit}
                      encType="multipart/form-data"
                    >
                      <div className="row">
                        <div className="col-lg-12 mb-1">
                          <div className="input-group mb-3">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              Banner Title
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Banner Title"
                              aria-label="title"
                              name="bannerTitle"
                              onChange={handleChange}
                              value={data.bannerTitle}
                              aria-describedby="basic-addon1"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="form-group with-title mb-3">
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows={3}
                              name="bannerDesc"
                              maxLength={maxLength}
                              onChange={handleChange}
                              value={data.bannerDesc}
                            />
                            <label>Banner Description</label>
                            <div>
                              {maxLength - data.bannerDesc.length} characters
                              remaining
                            </div>
                          </div>
                        </div>
                        <h5 className="card-title">Banner Image</h5>
                        <FilePond
                          files={
                            data.bannerImg ? [{ source: data.bannerImg }] : []
                          }
                          name="bannerImg"
                          credits={false}
                          className="single-file-filepond"
                          allowMultiple={false}
                          onupdatefiles={handleFileUpdate}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary mt-5 w-50 d-block mx-auto"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBanner;