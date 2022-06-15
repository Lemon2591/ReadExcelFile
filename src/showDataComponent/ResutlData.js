import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./ResultData.css";

export default function () {
  const [studentData, setStudentData] = useState([]);

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

  useEffect(() => {
    const resultDataShow = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:9000/datastudent", resultDataShow)
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
        data.map((student) => fixData(student));
        setStudentData([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // const resultDataShow = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   fetch("http://localhost:9000/datastudent", resultDataShow)
  //     .then((response) => {
  //       console.log(response);
  //       setIsRerender((state) => !state);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   const resultDataShow = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   fetch("http://localhost:9000/datastudent", resultDataShow)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       const fixData = (obj) => {
  //         for (let key in obj) {
  //           if (typeof obj[key] === "object") {
  //             for (let childKey in obj[key]) {
  //               obj[childKey] = obj[key][childKey];
  //             }
  //             delete obj[key];
  //           }
  //         }
  //       };
  //       fixData(data[0]);
  //       console.log(data[0]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  return (
    <>
      <div className="main">
        <div className="showData-list">
          <ul className="list-name-header-container">
            {showData.map((item, index) => {
              return (
                <li className="list-name-header show-content" key={index}>
                  {item}
                </li>
              );
            })}
          </ul>
          {studentData.map((dataShowColum, index) => {
            return (
              <ul className="show-Data" key={index}>
                {Object.keys(dataShowColum).map((key, index) => (
                  <li className="data-sudent show-content" key={index}>
                    <p key={index}> {dataShowColum[key]}</p>
                  </li>
                ))}
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
}
