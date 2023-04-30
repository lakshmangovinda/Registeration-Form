import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";
import { useEffect, useState } from "react";
import { db } from "../../Utils/fireBaseConfig";
import { collection, getDocs } from "firebase/firestore";
async function fetchAllData() {
  const querySnapshot = await getDocs(collection(db, "Registration"));
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
}
export const RegisteredData = () => {
  const [RegisterData, setRegisterData] = useState([]);

  useEffect(() => {
    fetchAllData().then((data) => {
      let userinfo = [];
      data.forEach((eachItem) => {
        userinfo.push(eachItem["item"]);
      });
      setRegisterData(userinfo);
    });

    try {
      if (!$.fn.DataTable.isDataTable("#table")) {
        setTimeout(function () {
          $(document).ready(function () {
            $("#table").DataTable({
              pageLength: 20,
              processing: true,
              paging: true,
              searching: true,
              search: true,
              pagingType: "full_numbers",
              dom: "Bfrtip",
              select: {
                style: "single",
                className: "btn btn-primary bg-primary text-white",
              },

              buttons: [
                {
                  extend: "pageLength",
                  className: "btn btn-primary bg-primary text-white",
                },
                {
                  extend: "copy",
                  className: "btn btn-primary bg-primary text-white ",
                },
                {
                  extend: "csv",
                  className: "btn btn-primary bg-primary text-white",
                },
                {
                  extend: "print",
                  customize: function (win) {
                    $(win.document.body).css("font-size", "10pt");
                    $(win.document.body)
                      .find("table")
                      .addClass("compact")
                      .css("font-size", "inherit");
                  },
                  className: "btn btn-primary bg-primary text-white",
                },
              ],

              // fnRowCallback: function (nRow, iDisplayIndexFull) {
              //   var index = iDisplayIndexFull + 1;
              //   $("td:first", nRow).html(index);
              //   return nRow;
              // },

              lengthMenu: [
                [10, 20, 30, 50, -1],
                [10, 20, 30, 50, "All"],
              ],
              columnDefs: [
                {
                  targets: 0,
                  render: function (data, type, meta) {
                    return type === "export" ? meta.row + 1 : data;
                  },
                },
              ],
              bDestroy: true,
            });
          }, 1000);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const showTable = () => {
    try {
      return RegisterData.map((item, index) => {
        return (
          <tr>
            <td className="text-xs font-weight-bold">{index + 1}</td>
            <td className="text-xs font-weight-bold">{item.name}</td>
            <td className="text-xs font-weight-bold">{item.age}</td>
            <td className="text-xs-center font-weight-bold">{item.mobile}</td>
            <td className="text-xs font-weight-bold">{item.sex}</td>
            <td className="text-xs font-weight-bold text-center ">
              {item.address}
            </td>
            <td className="text-xs font-weight-bold">{item.govtId}</td>
            <td className="text-xs font-weight-bold">
              {item.honorific + "." + item.GurdianName}
            </td>
            <td className="text-xs font-weight-bold">{item.Country}</td>
            <td className="text-xs font-weight-bold">{item.State}</td>
            <td className="text-xs font-weight-bold">{item.City}</td>
            <td></td>
          </tr>
        );
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="container-fluid py-4">
      <div className="table-responsive p-0 pb-2">
        <table
          id="table"
          className="table align-items-center justify-content-center mb-0"
        >
          <thead>
            <tr>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                S/N
              </th>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                Name
              </th>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                Age
              </th>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                Mobile
              </th>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                sex
              </th>
              <th className="text-uppercase text-secondary text-sm-center font-weight-bolder opacity-7 w-25 p-3">
                Address
              </th>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                GovtID
              </th>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                GuardianName
              </th>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                Country
              </th>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                State
              </th>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                City
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>{RegisterData.length > 0 ? showTable() : null}</tbody>
        </table>
      </div>
    </div>
  );
};
