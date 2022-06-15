import styled from "styled-components";

const TableContainer = styled.div`
  max-width: 100%;
  table {
    overflow-x: auto;
    .ant-select,
    .ant-input {
      width: 100%;
    }
    .text-right {
      text-align: end;
    }
  }
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr
    > th {
    white-space: nowrap;
  }
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > tbody
    > tr
    > td {
    padding: 8px;
  }
  .ant-table-selection-column {
    width: 3%;
  }
  .ant-table-column-sorters {
    align-items: flex-start;
  }
  .ant-table-thead > tr > th {
    font-size: 14px;
    font-weight: 600; /* .ant-input { min-width: 150px; } */
  }
  @media screen and (max-width: 991px) {
    overflow-x: auto;
    table {
      width: auto;
    }
  }
`;

export default TableContainer;
