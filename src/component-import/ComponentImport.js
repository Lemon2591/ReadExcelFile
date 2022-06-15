import { useState } from "react";
import "./ComponentImport.css";
import * as XLSX from "xlsx";
import { NavLink } from "react-router-dom";

export default function ComponentImport() {
  const [selectFile, setSeclectFie] = useState();
  const fileSelect = (e) => {
    e.preventDefault();
    if (selectFile) {
      if (
        selectFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        const files = e.target.files;
        const reader = new FileReader();
        reader.onload = function (e) {
          const data = "";
          const bytes = new Uint8Array(e.target.result);
          for (var i = 0; i < bytes.byteLength; i++) {
            data += String.fromCharCode(bytes[i]);
          }
          const bstr = e.target.result;
          const workbook = XLSX.read(bstr, {
            type: "binary",
          });
          const wsname = workbook.SheetNames[0];
          const ws = workbook.Sheets[wsname];
          const numberOfRecord = parseInt(
            workbook.Sheets.data["!ref"].split("W")[1]
          );

          for (let i = 6; i <= numberOfRecord; i++) {
            ws[`M${i}`].r = ws[`M${i}`].r.replaceAll(",", " -");
            ws[`M${i}`].v = ws[`M${i}`].v.replaceAll(",", " -");
            ws[`M${i}`].w = ws[`M${i}`].w.replaceAll(",", " -");
            ws[`M${i}`].h = ws[`M${i}`].h.replaceAll(",", " -");
          }

          const convertData = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          const convertText = convertData.split(/\r\n|\n/);

          // const resutlText = convertText[5].split(",").map((ele) => ele.trim());

          let childPropName = convertText[4].split(",");
          childPropName = childPropName.filter((value) => {
            if (value) {
              return value;
            }
          });

          let propName = convertText[3].split(",");
          // propName = propName.filter((value) => {
          //   if (value) {
          //     return value;
          //   }
          // });
          const studentList = [];

          const childPropNameDate = childPropName.splice(0, 3);
          for (let i = 5; i < numberOfRecord; i++) {
            studentList.push(
              convertText[i].split(",").map((ele) => ele.trim())
            );
          }

          studentList.map((student) => {
            const studentObject = {};
            let i = 0;

            while (i < propName.length) {
              if (propName[i] === "Ngày sinh") {
                studentObject[propName[i]] = {
                  [childPropNameDate[0]]: student[i],
                  [childPropNameDate[1]]: student[++i],
                  [childPropNameDate[2]]: student[++i],
                };
              } else {
                if (propName[i] === "Điểm sơ tuyển vòng 1") {
                  studentObject[propName[i]] = {
                    [childPropName[0]]: [i],
                    [childPropName[1]]: student[++i],
                    [childPropName[2]]: student[++i],
                    [childPropName[3]]: student[++i],
                    [childPropName[4]]: student[++i],
                    [childPropName[5]]: student[++i],
                    [childPropName[6]]: student[++i],
                    [childPropName[7]]: student[++i],
                  };
                } else {
                  studentObject[propName[i]] = student[i];
                  i++;
                }
              }
            }
            console.log(studentObject);
            delete studentObject[""];
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(studentObject),
            };
            fetch("http://localhost:9000/datastudent", requestOptions).then(
              (response) => response.json()
            );
          });
          alert("Import thành công");
          window.location.reload();
        };

        reader.readAsBinaryString(selectFile);
      } else {
        alert("File phải là định dạng .xlsx");
      }
    }
  };

  return (
    <>
      <div className="form-import-container">
        <div className="form-import-content">
          <div className="form-import">
            <div className="title-content">
              <div className="title">
                <h2>THÊM THÔNG TIN SINH VIÊN</h2>
                <p></p>
              </div>
              <div className="body-text">
                <div className="body-text-router">
                  <NavLink className="active-router effect-hover" to="/">
                    Thêm thông tin
                  </NavLink>
                  <NavLink
                    className="effect-hover"
                    to="/FormSearch"
                    style={{ color: "#fff" }}
                  >
                    Tra cứu thông tin
                  </NavLink>
                </div>
                {/* <div className="body-text-input">
                <div className="input-info">
                  <span></span>
                  <input></input>
                </div>
              </div> */}
              </div>
            </div>
            <div className="body-content">
              <div className="mb-3">
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => {
                    setSeclectFie(e.target.files[0]);
                  }}
                />
              </div>

              {/* <input
                type="file"
                onChange={(e) => {
                  setSeclectFie(e.target.files[0]);
                }}
              ></input> */}
              <button className="sumit-form-import" onClick={fileSelect}>
                Import
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="content">
        <input
          type="file"
          onChange={(e) => {
            setSeclectFie(e.target.files[0]);
          }}
        ></input>
        <button onClick={fileSelect}>import</button>
      </div> */}
    </>
  );
}
