import api from "./api";

export const getReports = async (params) => {
  const response = await api.get("/attendance", { params });
  return response.data;
};

export const getReportSummary = async () => {
  const response = await api.get("/attendance");
  const records = response.data;
  const summary = { Present: 0, Absent: 0, Late: 0, Leave: 0 };
  records.forEach((r) => {
    if (summary[r.status] !== undefined) summary[r.status]++;
  });
  return { records, summary };
};
