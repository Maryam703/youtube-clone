import React from "react";
import "./TableData.css";

export default function TableData() {
  const headings = ["Video", "Visibility", "Date", "Comment", "Like"];
  return (
    <div className="tbl-container">
      <div className="tbh-h1">Channel Content</div>
      <div className="tbh-h2">Videos</div>

      <table className="table">
        <thead>
          {headings.map((item) => {
            return <th>{item}</th>;
          })}
        </thead>

        <tbody>
          <tr>
            <td>
              <div className="video-detail-tbl">
                <div className="video-tbl">
                  <video className="video-player-tbl">
                    <source src="" />
                  </video>
                </div>
                <div>titel</div>
              </div>
            </td>
            <td>Public</td>
            <td>5 March 2024</td>
            <td>5</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
