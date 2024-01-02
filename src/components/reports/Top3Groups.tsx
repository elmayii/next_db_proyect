"use client";

import { top3Group } from "@/interfaces/Top3Group";
import { handleDownloadPDF } from "@/lib/utils";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";

interface Top3GroupsProps {
  columns: ColumnsType<top3Group>;
  data: top3Group[];
}

const Top3Groups: React.FC<Top3GroupsProps> = ({ columns, data }) => {
  return (
    <>
      <Button onClick={() => handleDownloadPDF(data, columns, "Top")}>
        Download PDF
      </Button>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Top3Groups;