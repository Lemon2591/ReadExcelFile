import React from "react";
import { NavLink } from "react-router-dom";
import "./ComponentSearch.css";
import { Table } from "antd";
import TableContainer from "./ContainerTable";
import { useState } from "react";
import { useEffect } from "react";

export default function ComponentSearch() {
  const [studentData, setStudentData] = useState();
  const [searchName, setSearchName] = useState();
  const [searchCode, setSearchCode] = useState();
  const [hideTable, setHideTable] = useState(true);

  const closeTable = () => {
    setHideTable(false);
    setStudentData("");
    setSearchCode("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchName && !searchCode) {
      alert("Vui lòng không được để trống");
    } else {
      if (!searchCode) {
        alert("Mã học sinh không được để trống");
      } else {
        const checkData = searchCode
          ? `?Mã học sinh=${searchCode}`
          : `?Họ và tên=${searchName}`;
        const resultDataShow = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        fetch("http://localhost:9000/datastudent" + checkData, resultDataShow)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const fixData = (obj) => {
              delete obj["id"];
              for (let key in obj) {
                if (typeof obj[key] === "object") {
                  for (let childKey in obj[key]) {
                    obj[childKey] = obj[key][childKey];
                  }
                  delete obj[key];
                }
              }
            };

            if (data.length > 0) {
              data.map((student) => fixData(student));
              setStudentData([...data]);
            } else {
              setStudentData(
                "Không tìm thấy kết quả. Vui lòng kiểm tra lại tên/mã sinh viên !"
              );
            }
            setHideTable(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const showData = [
    "STT",
    "Trường Tiểu học",
    "Quận/Huyện",
    "Mã học sinh",
    "Lớp",
    "Họ và tên",
    "Giới tính",
    "Nơi sinh",
    "Dân tộc",
    "Hộ khẩu thường trú",
    "Điện thoại liên hệ",
    "Ghi chú",
    "Ngày sinh",
    "Tháng sinh",
    "Năm sinh",
    "Tổng điểm năm lớp 1",
    "Tổng điểm năm lớp 2",
    "Tổng điểm năm lớp 3",
    "Tổng điểm năm lớp 4",
    "Tổng điểm năm lớp 5",
    "Tổng điểm kết quả 5 năm",
    "Điểm ưu tiên",
    "Tổng điểm sơ tuyển",
  ];

  return (
    <>
      <div className="form-import-container">
        <div className="form-import-content">
          <div className="form-import">
            <div className="title-content">
              <div className="title">
                <h2>THÊM THÔNG TIN SINH VIÊN</h2>
              </div>
              <div className="body-text">
                <div className="body-text-router">
                  <NavLink
                    className="effect-hover"
                    to="/"
                    style={{ color: "#fff" }}
                  >
                    Thêm thông tin
                  </NavLink>
                  <NavLink
                    className="active-router effect-hover"
                    to="/FormSearch"
                    style={{ color: "#fff" }}
                  >
                    Tra cứu thông tin
                  </NavLink>
                </div>
                <div className="body-text-input">
                  <p style={{ marginTop: "35px" }}>
                    Chú ý: dấu (*) là bắt buộc nhập
                  </p>
                  <div className="input-info">
                    <span>(*)</span>
                    <input
                      onChange={(e) => {
                        setSearchName(e.target.value);
                      }}
                      className=""
                      placeholder="Nhập họ và tên học sinh (VD: Nguyễn Văn Minh)"
                      data-val-required="Yêu cầu nhập họ tên học sinh."
                    ></input>
                  </div>
                  <div className="input-info">
                    <span>(*)</span>
                    <input
                      onChange={(e) => {
                        setSearchCode(e.target.value);
                      }}
                      className=""
                      placeholder="Nhập mã học sinh (VD: 01176GHAK)"
                      data-val-required="Yêu cầu nhập mã học sinh"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-content">
              <div className="mb-3"></div>
              <button className="sumit-form-import" onClick={handleSearch}>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
        {hideTable
          ? studentData?.length > 0 && (
              <div className="main">
                <p
                  style={{
                    fontWeight: "800",
                    position: "fixed",
                    width: "1180px",
                    textAlign: "center",
                    marginBottom: "25px",
                    top: "23%",
                    fontSize: "22px",
                  }}
                >
                  BẢNG KẾT QUẢ
                </p>
                <div className="showData-list">
                  <ul className="list-name-header-container">
                    {showData.map((item, index) => {
                      return (
                        <li
                          className="list-name-header show-content"
                          key={index}
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                  {typeof studentData !== "string" && studentData ? (
                    studentData?.map((dataShowColum, index) => {
                      return (
                        <ul className="show-Data" key={index}>
                          {Object.keys(dataShowColum)?.map((key, index) => (
                            <li
                              className="data-sudent show-content"
                              key={index}
                            >
                              <p key={index}> {dataShowColum[key]}</p>
                            </li>
                          ))}
                        </ul>
                      );
                    })
                  ) : (
                    <p
                      style={{
                        width: "1180px",
                        zIndex: "100",
                        marginTop: "60px",
                        textAlign: "center",
                        position: "fixed",
                        fontWeight: "800",
                        fontSize: "18px",
                      }}
                    >
                      {studentData}
                    </p>
                  )}

                  <div className="close-data-form">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => closeTable()}
                    >
                      Đóng bảng
                    </button>
                  </div>
                </div>
              </div>
            )
          : null}
      </div>
    </>
  );
}
